"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Mail } from "lucide-react";
import { toast } from "@/components/ui/toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { forgotPasswordAction } from "@/app/api/actions/authActions/ForgotPasswordAction";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/Schemas/ForgotPasswordSchema";

export default function ForgotPasswordForm({
  defaultEmail,
  onSuccess,
}: {
  defaultEmail: string;
  onSuccess: (email: string) => void;
}) {
  async function handleSubmit(values: ForgotPasswordFormValues) {
    const result = await forgotPasswordAction(values.email);

    if (result.ok) {
      onSuccess(values.email);
    } else {
      toast.add({
        type: "error",
        description: result.message,
        priority: "high",
      });
    }
  }

  const formik = useFormik<ForgotPasswordFormValues>({
    initialValues: { email: defaultEmail },
    validationSchema: toFormikValidationSchema(forgotPasswordSchema),
    onSubmit: handleSubmit,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <FormField
        id="email"
        label="Email"
        type="email"
        icon={<Mail size={16} />}
        placeholder="you@example.com"
        autoComplete="email"
        value={formik.values.email}
        error={
          formik.touched.email ? (formik.errors.email as string) : undefined
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />

      <SubmitButton loading={formik.isSubmitting}>Send reset code</SubmitButton>
    </form>
  );
}
