"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Lock, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { changePasswordAction } from "@/app/api/actions/authActions/ChangePasswordAction";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/Schemas/ChangePasswordSchema";

export default function ChangePasswordForm() {
  const router = useRouter();

  async function handleSubmit(values: ChangePasswordFormValues) {
    const result = await changePasswordAction(values);

    if (result.ok) {
      toast.add({
        type: "success",
        description: "Password changed. Please log in again.",
      });
      await signOut({ redirect: false });
      router.push("/login");
    } else {
      toast.add({
        type: "error",
        description: result.message,
        priority: "high",
      });
    }
  }

  const formik = useFormik<ChangePasswordFormValues>({
    initialValues: { currentPassword: "", password: "", rePassword: "" },
    validationSchema: toFormikValidationSchema(changePasswordSchema),
    onSubmit: handleSubmit,
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div>
        <h2 className="text-lg font-semibold text-[#1F2937]">
          Change password
        </h2>
        <p className="mt-1 text-sm text-[#7A7A7A]">
          Use a strong password you don&apos;t use anywhere else.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <FormField
          id="currentPassword"
          label="Current password"
          type="password"
          icon={<Lock size={16} />}
          placeholder="Enter your current password"
          autoComplete="current-password"
          value={formik.values.currentPassword}
          error={
            formik.touched.currentPassword
              ? (formik.errors.currentPassword as string)
              : undefined
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            id="password"
            label="New password"
            type="password"
            icon={<Lock size={16} />}
            placeholder="Enter a new password"
            autoComplete="new-password"
            value={formik.values.password}
            error={
              formik.touched.password
                ? (formik.errors.password as string)
                : undefined
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <FormField
            id="rePassword"
            label="Confirm new password"
            type="password"
            icon={<Lock size={16} />}
            placeholder="Repeat the new password"
            autoComplete="new-password"
            value={formik.values.rePassword}
            error={
              formik.touched.rePassword
                ? (formik.errors.rePassword as string)
                : undefined
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-[#F7F5F2] p-4 text-sm text-[#4B5563]">
        <ShieldAlert size={18} className="mt-0.5 shrink-0 text-[#0EA5A0]" />
        <p>
          For your security, you&apos;ll be logged out after changing your
          password and will need to log in again.
        </p>
      </div>

      <div className="flex border-t border-black/5 pt-6 sm:justify-end">
        <div className="w-full sm:w-52">
          <SubmitButton loading={formik.isSubmitting}>
            Update password
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
