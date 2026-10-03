import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters"),

    email: z.string().email("Enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    rePassword: z.string(),

    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
