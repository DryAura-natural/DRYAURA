// utils/validation.ts

import { z } from "zod";

// Constants for validation
const PHONE_REGEX = /^[6-9]\d{9}$/;
const POSTAL_CODE_REGEX = /^\d{6}$/;
const NAME_REGEX = /^[a-zA-Z\s'-]+$/;
const ADDRESS_REGEX = /^[a-zA-Z0-9\s,.'-]+$/;

export const customerSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .regex(NAME_REGEX, "Name can only contain letters, spaces, hyphens, and apostrophes"),

  email: z.string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),

  phone: z.string()
    .trim()
    .regex(PHONE_REGEX, "Please enter a valid 10-digit Indian mobile number"),

  alternatePhone: z.string()
    .trim()
    .regex(PHONE_REGEX, "Please enter a valid 10-digit Indian mobile number")
    .optional(),

  streetAddress: z.string()
    .trim()
    .min(5, "Street address must be at least 5 characters")
    .max(200, "Street address cannot exceed 200 characters")
    .regex(ADDRESS_REGEX, "Invalid street address format"),

  city: z.string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(50, "City cannot exceed 50 characters")
    .regex(NAME_REGEX, "City name can only contain letters"),

  landmark: z.string()
    .trim()
    .min(2, "Landmark must be at least 2 characters")
    .max(50, "Landmark cannot exceed 50 characters")
    .optional(),

  town: z.string()
    .trim()
    .min(2, "Town must be at least 2 characters")
    .max(50, "Town cannot exceed 50 characters")
    .optional(),

  state: z.string()
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(50, "State cannot exceed 50 characters"),

  postalCode: z.string()
    .trim()
    .regex(POSTAL_CODE_REGEX, "Please enter a valid 6-digit postal code"),

  country: z.string()
    .trim()
    .default("India")
    .optional(),
}).refine(
  data => data.phone !== data.alternatePhone, 
  { 
    message: "Primary and alternate phone numbers must be different",
    path: ["alternatePhone"] 
  }
);

export type BillingInfo = z.infer<typeof customerSchema>;

// Validation helper function
export function validateCustomerData(input: unknown): BillingInfo {
  const result = customerSchema.safeParse(input);
  
  if (!result.success) {
    console.error("Validation errors:", result.error.flatten());
    throw new Error("Invalid customer data", {
      cause: result.error.flatten()
    });
  }
  
  return result.data;
}

// Debug utility for detailed error logging
export function debugValidation(data: unknown) {
  try {
    return customerSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.table(error.errors.map(e => ({
        Path: e.path.join('.'),
        Code: e.code,
        Message: e.message
      })));
    }
    throw error;
  }
}