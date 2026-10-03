import { z } from "zod";

export const addressSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters"),

  details: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters"),

  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),

  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(30, "City must be less than 30 characters"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
