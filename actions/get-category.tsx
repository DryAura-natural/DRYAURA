import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategory = async (categoryIdentifier: string): Promise<Category | null> => {
  try {
    console.log('Fetching category with identifier:', categoryIdentifier);
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
    
    const res = await fetch(`${URL}/${categoryIdentifier}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response status:', res.status);
    
    // Handle non-200 responses
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch category: ${res.status}, ${errorText}`);
      return null;
    }
    
    const data = await res.json();
    console.log('Fetched category data:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

export default getCategory;