import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine(
    function (data) {
      return data.password === data.rePassword;
    },
    { message: "Passwords do not match", path: ["rePassword"] },
  )
  .refine(
    function (data) {
      return data.password !== data.currentPassword;
    },
    {
      message: "New password must be different from the current one",
      path: ["password"],
    },
  );

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
