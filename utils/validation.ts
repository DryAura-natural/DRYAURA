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
    .min(1, "Name must be at least 1 character")
    .max(50, "Name cannot exceed 50 characters")
    .optional()
    .transform(val => val === '' ? undefined : val)
    .refine(val => val === undefined || NAME_REGEX.test(val), { 
      message: "Name can only contain letters, spaces, hyphens, and apostrophes" 
    }),

  email: z.string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters")
    .optional()
    .transform(val => val === '' ? undefined : val),

  phone: z.string()
    .trim()
    .regex(PHONE_REGEX, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .transform(val => val === '' ? undefined : val),

  alternatePhone: z.string()
    .trim()
    .regex(PHONE_REGEX, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .transform(val => val === '' ? undefined : val),

  streetAddress: z.string()
    .trim()
    .min(1, "Street address must be at least 1 character")
    .max(200, "Street address cannot exceed 200 characters")
    .optional()
    .transform(val => val === '' ? undefined : val)
    .refine(val => val === undefined || ADDRESS_REGEX.test(val), { 
      message: "Street address contains invalid characters" 
    }),

  city: z.string()
    .trim()
    .min(1, "City must be at least 1 character")
    .max(50, "City cannot exceed 50 characters")
    .optional()
    .transform(val => val === '' ? undefined : val),

  landmark: z.string()
    .trim()
    .min(1, "Landmark must be at least 1 character")
    .max(50, "Landmark cannot exceed 50 characters")
    .optional()
    .transform(val => val === '' ? undefined : val),

  town: z.string()
    .trim()
    .max(50, "Town cannot exceed 50 characters")
    .optional()
    .transform(val => val === '' ? undefined : val),

  state: z.string()
    .trim()
    .min(1, "State must be at least 1 character")
    .max(50, "State cannot exceed 50 characters")
    .optional()
    .transform(val => val === '' ? undefined : val),

  postalCode: z.string()
    .trim()
    .regex(POSTAL_CODE_REGEX, "Please enter a valid 6-digit postal code")
    .optional()
    .transform(val => val === '' ? undefined : val),

  country: z.string()
    .trim()
    .default("India")
    .optional()
    .transform(val => val === '' ? undefined : val),
}).partial(); // Allow partial object validation

export type BillingInfo = z.infer<typeof customerSchema>;

// Validation helper function with detailed logging
export function validateCustomerData(input: unknown): BillingInfo {
  try {
    const result = customerSchema.safeParse(input);
    
    if (!result.success) {
      console.error("Detailed Validation Errors:", 
        result.error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
          code: err.code
        }))
      );
      
      // Log the raw input for debugging
      console.log('Raw Input:', JSON.stringify(input, null, 2));
    }
    
    return result.data as BillingInfo;
  } catch (error) {
    console.error("Unexpected validation error:", error);
    throw error;
  }
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
      
      // Log the raw data for debugging
      console.log('Raw Data:', JSON.stringify(data, null, 2));
    }
    throw error;
  }
}