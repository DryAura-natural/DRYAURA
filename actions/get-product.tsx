import { Product } from "@/types";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

// Cache setup (in-memory cache for frequent requests)
const productCache = new Map<string, { promise: Promise<Product>, timestamp: number }>();

const getProduct = async (id: string): Promise<Product> => {
  // Validate input
  if (!id || typeof id !== 'string') {
    throw new Error("Invalid product ID");
  }

  // Check cache first
  const cached = productCache.get(id);
  if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour cache
    return cached.promise;
  }

  let controller: AbortController | null = new AbortController();
  const timeoutId = setTimeout(() => controller?.abort(), 5000); // 5s timeout

  try {
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
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch product (HTTP ${response.status})`);
      }

      const data = await response.json();
      
      // Basic response validation
      if (!data.id || !data.name) {
        throw new Error("Invalid product data structure");
      }

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

    console.error(`Product fetch error (ID: ${id}):`, error);
    throw new Error(errorMessage);
  } finally {
    // Cleanup cache after 1 hour
    setTimeout(() => productCache.delete(id), 3600000);
  }
};

export default getProduct;