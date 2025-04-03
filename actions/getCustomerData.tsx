import { BillingInfo, customerSchema } from "@/utils/validation";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";

const URL = `${process.env.NEXT_PUBLIC_API_URL_ADMIN}/api/customer`;

const getCustomerData = async (id: string): Promise<BillingInfo> => {
  if (!id) {
    throw new Error("User ID is required to fetch customer data");
  }

  // Fetch Clerk user details for fallback
  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error("No authenticated user found");
  }

  console.log(`Attempting to fetch customer data for Clerk User ID: ${id}`);
  console.log(`Clerk User Email: ${clerkUser.emailAddresses[0]?.emailAddress}`);

  try {
    // First, attempt to fetch existing customer
    const fetchResponse = await fetch(`${URL}?userId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Clerk-User-Id': id,
      },
      cache: 'no-store',
    });

    // If customer exists, return the data
    if (fetchResponse.ok) {
      const customerData = await fetchResponse.json();
      return customerSchema.parse(customerData);
    }

    // If customer not found, attempt to create
    const createResponse = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Clerk-User-Id': id,
      },
      body: JSON.stringify({
        userId: id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: clerkUser.fullName || clerkUser.firstName || 'Unknown User',
        phone: clerkUser.phoneNumbers[0]?.phoneNumber || '',
      }),
    });

    if (!createResponse.ok) {
      const errorBody = await createResponse.text();
      console.error('Customer creation failed:', errorBody);
      throw new Error(`Failed to create customer. Status: ${createResponse.status}`);
    }

    // Fetch the newly created customer
    const newCustomerResponse = await fetch(`${URL}?userId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Clerk-User-Id': id,
      },
      cache: 'no-store',
    });

    if (!newCustomerResponse.ok) {
      throw new Error('Failed to retrieve newly created customer');
    }

    const newCustomerData = await newCustomerResponse.json();
    
    // Validate the data against the schema
    return customerSchema.parse({
      name: newCustomerData.name || clerkUser.fullName || '',
      email: newCustomerData.email || clerkUser.emailAddresses[0]?.emailAddress || '',
      phone: newCustomerData.phone || '',
      alternatePhone: '',
      streetAddress: '',
      city: '',
      state: '',
      landmark: '',
      postalCode: '',
      country: 'India',
      town: '',
    });

  } catch (error) {
    console.error('Detailed customer data fetch error:', error);

    // Fallback to creating a minimal customer profile
    if (error instanceof z.ZodError) {
      console.error("Data validation error:", error.errors);
      
      // Return a minimal valid customer profile
      return {
        name: clerkUser.fullName || 'Unknown User',
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        phone: '',
        alternatePhone: '',
        streetAddress: '',
        city: '',
        state: '',
        landmark: '',
        postalCode: '',
        country: 'India',
        town: '',
      };
    }

    throw error;
  }
};

export default getCustomerData;
