
import { BillingInfo } from "@/utils/validation";

const URL = `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/customer`;

const getCustomerData = async (id: string): Promise<BillingInfo> => {
  try {
    console.log(`Fetching customer data for user ID: ${id}`);
    
    const res = await fetch(`${URL}?userId=${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch customerData. Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched Customer Data:", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching customer data:", error);
    throw new Error("An error occurred while fetching the customerData.");
  }
};

export default getCustomerData;





