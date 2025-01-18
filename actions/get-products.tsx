import { Product } from "@/types";
import qs from "query-string"

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query{
  categoryId?:string;
  colorId?:string;
  sizeId?:string;
  isFeatured?:boolean;
}

const getProducts = async (quary:Query): Promise<Product[]> => { 
  const url = qs.stringifyUrl({
    url:URL,
    query:{
      colorId:quary.colorId,
      sizeId:quary.sizeId,
      categoryId:quary.categoryId,
      isFeature:quary.isFeatured,
    }
    
    
  })// Adjusted return type to an object
  const res = await fetch(url);
 
  return res.json(); // Return the parsed result
};
export default getProducts