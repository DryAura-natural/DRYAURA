import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => { // Adjusted return type to an object
  const res = await fetch(URL);
 
  return res.json(); // Return the parsed result
};
export default getCategories