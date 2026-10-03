"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "@/components/ui/toast";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { SignUpFormValues, signUpSchema } from "@/Schemas/SignUpSchema";
import { useState } from "react";
import { SignUp } from "@/services/SignUp";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();

  async function handleSignup(values: SignUpFormValues) {
    const isRegisterd = await SignUp(values);

    if (isRegisterd) {
      toast.add({
        type: "success",
        description: "Account has been created.",
      });

      router.push("/login");
    } else {
      toast.add({
        type: "error",
        description: "Account already exist.",
        priority: "high",
      });
    }
  }

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: toFormikValidationSchema(signUpSchema),
    onSubmit: handleSignup,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-xs w-fit font-semibold uppercase tracking-wide text-[#1F2937]"
        >
          Full Name
        </label>
        <div
          className={
            "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
            (formik.touched.name && formik.errors.name
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
              : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
          }
        >
          <User size={16} className="mr-3 shrink-0 text-[#8E93A0]" />
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. John Doe"
            className="w-full bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.name && formik.errors.name ? (
          <p className="text-xs text-red-500">{formik.errors.name as string}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs w-fit font-semibold uppercase tracking-wide text-[#1F2937]"
        >
          Email
        </label>
        <div
          className={
            "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
            (formik.touched.email && formik.errors.email
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
              : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
          }
        >
          <Mail size={16} className="mr-3 shrink-0 text-[#8E93A0]" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <p className="text-xs text-red-500">
            {formik.errors.email as string}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-xs w-fit font-semibold uppercase tracking-wide text-[#1F2937]"
          >
            Password
          </label>
          <div
            className={
              "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
              (formik.touched.password && formik.errors.password
                ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
            }
          >
            <Lock size={16} className="mr-3 shrink-0 text-[#8E93A0]" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              className="w-full bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 shrink-0 cursor-pointer text-[#8E93A0] hover:text-[#1F2937]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="text-xs text-red-500">
              {formik.errors.password as string}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="rePassword"
            className="text-xs w-fit font-semibold uppercase tracking-wide text-[#1F2937]"
          >
            Confirm Password
          </label>
          <div
            className={
              "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
              (formik.touched.rePassword && formik.errors.rePassword
                ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
            }
          >
            <Lock size={16} className="mr-3 shrink-0 text-[#8E93A0]" />
            <input
              id="rePassword"
              name="rePassword"
              type={showRePassword ? "text" : "password"}
              placeholder="Re-enter your password"
              className="w-full bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              aria-label={showRePassword ? "Hide password" : "Show password"}
              onClick={() => setShowRePassword(!showRePassword)}
              className="ml-2 shrink-0 cursor-pointer text-[#8E93A0] hover:text-[#1F2937]"
            >
              {showRePassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <p className="text-xs text-red-500">
              {formik.errors.rePassword as string}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone"
          className="text-xs w-fit font-semibold uppercase tracking-wide text-[#1F2937]"
        >
          Phone Number
        </label>
        <div
          className={
            "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
            (formik.touched.phone && formik.errors.phone
              ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
              : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
          }
        >
          <Phone size={16} className="mr-3 shrink-0 text-[#8E93A0]" />
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="e.g. 01012345678"
            className="w-full bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-xs text-red-500">
            {formik.errors.phone as string}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="mt-2 group flex h-13 cursor-pointer w-full items-center justify-center gap-2 rounded-lg bg-[#E8571F] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] active:scale-[0.99]"
      >
        Create account
        <ArrowRight
          size={16}
          className="group-hover:translate-x-3 transition-all duration-200"
        />
      </button>

      <p className="text-center text-xs leading-5 text-[#7A7A7A] sm:text-sm">
        By creating an account you agree to our{" "}
        <Link
          href="/terms"
          className="font-medium underline text-[#1F2937] hover:text-[#E8571F]"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-[#1F2937] underline hover:text-[#E8571F]"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
