import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().refine(function (value) {
    return value === "" || /^01[0125][0-9]{8}$/.test(value);
  }, "Enter a valid Egyptian phone number"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
