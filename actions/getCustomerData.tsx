import { BillingInfo, customerSchema } from "@/utils/validation";
import { z } from "zod";

const URL = `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/customer`;

const getCustomerData = async (id: string): Promise<BillingInfo> => {
  if (!id) {
    throw new Error("User ID is required to fetch customer data");
  }

  try {
    const res = await fetch(`${URL}?userId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Failed to fetch customer data. Status: ${res.status}. Details: ${errorBody}`);
    }

    const rawData = await res.json();

    // Validate the fetched data against the BillingInfo schema
    const validatedData = {
      name: rawData.name || '',
      email: rawData.email || '',
      phone: rawData.phone || '',
      alternatePhone: rawData.alternatePhone || '',
      streetAddress: rawData.streetAddress || '',
      city: rawData.city || '',
      state: rawData.state || '',
      landmark: rawData.landmark || '',
      postalCode: rawData.postalCode || '',
      country: rawData.country || 'India',
      town: rawData.town || '',
    };

    // Final validation using the schema
    return customerSchema.parse(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Data validation error:", error.errors);
      throw new Error("Invalid customer data received from server");
    }

    if (error instanceof Error) {
      console.error("Error fetching customer data:", error.message);
      throw error;
    }

    console.error("Unknown error fetching customer data:", error);
    throw new Error("An unexpected error occurred while fetching customer data");
  }
};

export default getCustomerData;
