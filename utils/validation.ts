// utils/validation.ts

import { z } from "zod";

export const billingSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  contact: z.string().length(13, "Contact must be 10 digits"),
  streetAddress: z.string().nonempty("Street address is required"),
  city: z.string().nonempty("Area, Street, Sector, Village is required"),
  landmark: z.string().nonempty("landmark is required"),
  town: z.string().nonempty("Town/City is required"),
  state: z.string().nonempty("State is required"),
  postalCode: z.string().length(6, "Postal code must be 6 digits"),
  // country: z.string().nonempty("Country is required"),
  // termsAccepted: z.boolean().refine((val) => val, "You must accept the terms"),
});

export type BillingInfo = z.infer<typeof billingSchema>;
