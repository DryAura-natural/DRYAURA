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

  // If no valid cache, fetch the product
  try {
    const productPromise = fetch(`${API_URL}/${id}`, {
      cache: 'no-store', // Ensure fresh data
      next: { revalidate: 0 } // Disable caching
    }).then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch product: ${errorText}`);
      }
      return response.json();
    });

    // Store in cache
    productCache.set(id, {
      promise: productPromise,
      timestamp: Date.now()
    });

    // Clean up old cache entries periodically
    if (productCache.size > 100) {
      const now = Date.now();
      for (const [key, value] of productCache.entries()) {
        if (now - value.timestamp > 3600000) {
          productCache.delete(key);
        }
      }
    }

    return await productPromise;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    
    // Remove from cache on error
    productCache.delete(id);
    
    throw error;
  }
};

export default getProduct;
