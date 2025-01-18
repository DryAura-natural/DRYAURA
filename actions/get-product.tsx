import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<Product> => {
  try {
      const res = await fetch(`${URL}/${id}`);
      if (!res.ok) {
          throw new Error(`Failed to fetch billboard with id: ${id}`);
      }
      return res.json();
  } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the billboard.");
  }
};

export default getProduct;
