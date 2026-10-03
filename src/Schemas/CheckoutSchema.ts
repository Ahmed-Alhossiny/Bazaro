import { z } from "zod";

export const checkoutSchema = z.object({
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

  postalCode: z.string().regex(/^[0-9]{5}$/, "Postal code must be 5 digits"),

  paymentMethod: z.enum(["cash", "card"]),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
