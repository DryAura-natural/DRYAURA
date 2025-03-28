import { Product } from "@/types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

// Cache setup (in-memory cache for frequent requests)
const productCache = new Map<string, { promise: Promise<Product>, timestamp: number }>();

const getProduct = async (id: string): Promise<Product> => {
  // Validate input
  if (!id || typeof id !== 'string') {
    console.error('Invalid product ID input:', id);
    throw new Error("Invalid product ID");
  }

  // Check cache first
  const cached = productCache.get(id);
  if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
    console.log(`Returning cached product for ID: ${id}`);
    return cached.promise;
  }

  let controller: AbortController | null = new AbortController();
  const timeoutId = setTimeout(() => {
    console.warn(`Request for product ${id} timed out`);
    controller?.abort();
  }, 5000); // 5s timeout

  try {
    console.log(`Fetching product with ID: ${id}`);
    const fetchPromise = fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      },
      next: {
        revalidate: 3600 // Incremental Static Regeneration (ISR) for Next.js
      },
      signal: controller.signal
    }).then(async (response) => {
      clearTimeout(timeoutId);
      controller = null;
      
      console.log(`Response status for product ${id}: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.text(); 
        console.error(`Failed to fetch product (HTTP ${response.status}):`, errorData);
        throw new Error(errorData || `Failed to fetch product (HTTP ${response.status})`);
      }

      const data = await response.json();
      
      // Enhanced response validation
      if (!data || !data.id || !data.name) {
        console.error('Invalid product data structure:', data);
        throw new Error("Invalid product data structure");
      }

      console.log(`Successfully fetched product: ${data.name} (ID: ${data.id})`);
      return data as Product;
    });

    // Cache the promise instead of the result
    productCache.set(id, { promise: fetchPromise, timestamp: Date.now() });

    return await fetchPromise;
  } catch (error) {
    let errorMessage = 'Failed to fetch product';
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out';
      } else {
        errorMessage = error.message;
      }
    }

    console.error(`Product fetch error (ID: ${id}):`, {
      errorName: error instanceof Error ? error.name : 'Unknown Error',
      errorMessage: error instanceof Error ? error.message : String(error),
      fullError: error
    });
    
    throw new Error(errorMessage);
  } finally {
    // Cleanup cache after 1 hour
    setTimeout(() => productCache.delete(id), 3600000);
  }
};

export default getProduct;
