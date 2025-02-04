import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/customer`;

interface Query {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const customerData = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      userId: query.userId,
      firstName: query.firstName,
      lastName: query.lastName,
      email: query.email,
      phone: query.phone,
      streetAddress: query.streetAddress,
      city: query.city,
      state: query.state,
      postalCode: query.postalCode,
      country: query.country,
    
    },
  });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch customer Data");
  }

  return res.json(); // Return the parsed result
};

export default customerData;
