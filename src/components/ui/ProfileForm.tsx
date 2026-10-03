"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Mail, Phone, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import FormField from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { updateProfileAction } from "@/app/api/actions/authActions/UpdateProfileAction";
import {
  UpdateProfileFormValues,
  updateProfileSchema,
} from "@/Schemas/UpdateProfileSchema";

export default function ProfileForm() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const initialName = session?.user?.name || "";
  const initialEmail = session?.user?.email || "";
  const initialPhone = (session?.user as any)?.phone || "";

  async function handleSave(values: UpdateProfileFormValues) {
    const changes: { name?: string; email?: string; phone?: string } = {};

    if (values.name !== initialName) {
      changes.name = values.name;
    }

    if (values.email !== initialEmail) {
      changes.email = values.email;
    }

    if (values.phone !== initialPhone && values.phone !== "") {
      changes.phone = values.phone;
    }

    const result = await updateProfileAction(changes);

    if (result.ok) {
      toast.add({
        type: "success",
        description: "Profile updated successfully.",
      });
      await update({ name: values.name, email: values.email });
      router.refresh();
    } else {
      toast.add({
        type: "error",
        description: result.message,
        priority: "high",
      });
    }
  }

  const formik = useFormik<UpdateProfileFormValues>({
    initialValues: {
      name: initialName,
      email: initialEmail,
      phone: initialPhone,
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(updateProfileSchema),
    onSubmit: handleSave,
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div>
        <h2 className="text-lg font-semibold text-[#1F2937]">
          Profile information
        </h2>
        <p className="mt-1 text-sm text-[#7A7A7A]">
          Update your name, email and phone number.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormField
            id="name"
            label="Full name"
            icon={<UserRound size={16} />}
            placeholder="Your full name"
            autoComplete="name"
            value={formik.values.name}
            error={
              formik.touched.name ? (formik.errors.name as string) : undefined
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

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

        <FormField
          id="phone"
          label="Phone"
          type="tel"
          icon={<Phone size={16} />}
          placeholder="01012345678"
          autoComplete="tel"
          value={formik.values.phone}
          error={
            formik.touched.phone ? (formik.errors.phone as string) : undefined
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-black/5 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={!formik.dirty || formik.isSubmitting}
          onClick={function () {
            formik.resetForm();
          }}
          className="h-12 cursor-pointer rounded-lg border border-black/10 px-6 text-sm font-semibold text-[#1F2937] transition-colors hover:bg-[#F7F5F2] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Discard
        </button>
        <div className="sm:w-44">
          <SubmitButton loading={formik.isSubmitting} disabled={!formik.dirty}>
            Save changes
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
