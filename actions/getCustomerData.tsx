import { BillingInfo, customerSchema } from "@/utils/validation";
import { z } from "zod";

const URL = `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/customer`;

const getCustomerData = async (id: string): Promise<BillingInfo> => {
  if (!id) {
    throw new Error("User ID is required to fetch customer data");
  }

  console.log(`Attempting to fetch customer data for Clerk User ID: ${id}`);

  try {
    const res = await fetch(`${URL}?userId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Consider adding authorization header if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
      cache: 'no-store', // Ensure fresh data
    });

    console.log(`Customer fetch response status: ${res.status}`);

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`Customer fetch error details: ${errorBody}`);
      
      // More specific error handling
      if (res.status === 404) {
        // If customer not found, you might want to create a customer
        console.warn(`Customer not found for User ID: ${id}. Consider creating a new customer.`);
      }

      throw new Error(`Failed to fetch customer data. Status: ${res.status}. Details: ${errorBody}`);
    }

    const rawData = await res.json();
    console.log('Raw customer data received:', JSON.stringify(rawData, null, 2));

    // Validate the fetched data against the BillingInfo schema
    const validatedData = {
      name: rawData.name || '',
      email: rawData.email || '',
      phone: rawData.phone || '',
      alternatePhone: rawData.alternatePhone || rawData.phone || '', // Use primary phone if no alternate
      streetAddress: rawData.streetAddress || '',
      city: rawData.city || '',
      state: rawData.state || '',
      landmark: rawData.landmark || undefined, 
      postalCode: rawData.postalCode || '',
      town: rawData.town || undefined, 
    };

    try {
      // Validate the data using the customerSchema
      const parsedData = customerSchema.parse(validatedData);
      console.log('Parsed customer data:', JSON.stringify(parsedData, null, 2));
      return parsedData;
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        console.error('Customer data validation failed:', validationError.errors);
        throw new Error(`Invalid customer data: ${validationError.errors.map(e => `${e.path}: ${e.message}`).join(', ')}`);
      }
      throw validationError;
    }
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
