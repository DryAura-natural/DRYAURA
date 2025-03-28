import { Product } from "@/types";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query{
  categoryId?:string;
  colorId?:string;
  sizeId?:string;
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

const getProducts = async (query:Query): Promise<Product[]> => { 
  const url = qs.stringifyUrl({
    url:URL,
    query:{
      colorId:query.colorId,
      sizeId:query.sizeId,
      categoryId:query.categoryId,
    }
  });

  console.log('Fetching products from URL:', url);

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Failed to fetch products:', errorText);
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const data: ProductResponse = await res.json();
    
    console.log('Fetched products:', data.products.length);
    
    // Validate the response structure
    if (!Array.isArray(data.products)) {
      console.error('Invalid products data structure:', data);
      throw new Error('Invalid products data structure');
    }

    return data.products;
  } catch (error) {
    console.error('Error in getProducts:', error);
    throw error;
  }
};

export default getProducts;