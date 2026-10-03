"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { resetPasswordAction } from "@/app/api/actions/authActions/ResetPasswordAction";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/Schemas/ResetPasswordSchema";

export default function ResetPasswordForm({ email }: { email: string }) {
  const router = useRouter();

  async function handleSubmit(values: ResetPasswordFormValues) {
    const result = await resetPasswordAction(email, values.newPassword);

    if (result.ok) {
      toast.add({
        type: "success",
        description: "Password reset successfully. Please log in.",
      });
      router.push("/login");
    } else {
      toast.add({
        type: "error",
        description: result.message,
        priority: "high",
      });
    }
  }

  const formik = useFormik<ResetPasswordFormValues>({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema: toFormikValidationSchema(resetPasswordSchema),
    onSubmit: handleSubmit,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <FormField
        id="newPassword"
        label="New password"
        type="password"
        icon={<Lock size={16} />}
        placeholder="Enter your new password"
        autoComplete="new-password"
        value={formik.values.newPassword}
        error={
          formik.touched.newPassword
            ? (formik.errors.newPassword as string)
            : undefined
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <FormField
        id="confirmPassword"
        label="Confirm password"
        type="password"
        icon={<Lock size={16} />}
        placeholder="Repeat your new password"
        autoComplete="new-password"
        value={formik.values.confirmPassword}
        error={
          formik.touched.confirmPassword
            ? (formik.errors.confirmPassword as string)
            : undefined
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <SubmitButton loading={formik.isSubmitting}>Reset password</SubmitButton>
    </form>
  );
}
