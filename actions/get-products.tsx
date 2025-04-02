import { Product } from "@/types";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  categoryName?: string;
  minPrice?: string;
  maxPrice?: string;
  priceRange?: string;
}

interface ProductResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    pageSize: number;
  };
}

const getProducts = async (query: Query): Promise<Product[]> => { 
  // Process price range if provided
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  console.log('Received query:', JSON.stringify(query, null, 2));

  if (query.priceRange) {
    console.log('Processing price range:', query.priceRange);
    switch (query.priceRange) {
      case '0-500':
        minPrice = 0;
        maxPrice = 500;
        break;
      case '500-1000':
        minPrice = 500;
        maxPrice = 1000;
        break;
      case '1000-2000':
        minPrice = 1000;
        maxPrice = 2000;
        break;
      case '2000+':
        minPrice = 2000;
        maxPrice = undefined;
        break;
    }
    console.log('Processed price range:', { minPrice, maxPrice });
  }

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryName: query.categoryName,
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      minPrice: query.minPrice || (minPrice !== undefined ? minPrice.toString() : undefined),
      maxPrice: query.maxPrice || (maxPrice !== undefined ? maxPrice.toString() : undefined),
    }
  });

  console.log('Fetching products from URL:', url);

  try {
    const res = await fetch(url, { 
      cache: 'no-store',  // Ensure fresh data
      next: { revalidate: 0 }  // Disable caching
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch products:', errorText);
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const data: ProductResponse = await res.json();
    
    console.log('Fetched products:', {
      totalProducts: data.products.length,
      pagination: data.pagination
    });
    
    // Validate the response structure
    if (!Array.isArray(data.products)) {
      console.error('Invalid products data structure:', data);
      return [];
    }

    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default getProducts;