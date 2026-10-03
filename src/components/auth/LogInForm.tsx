"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "@/components/ui/toast";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogInFormValues, logInSchema } from "@/Schemas/LogInSchema";
import { signIn } from "next-auth/react";

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleLogIn(values: LogInFormValues) {
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result && result.ok && !result.error) {
      toast.add({
        type: "success",
        description: "Logged in successfully.",
      });

      const requested = new URLSearchParams(window.location.search).get(
        "callbackUrl",
      );
      let target = "/";

      if (
        requested &&
        requested.startsWith("/") &&
        !requested.startsWith("//")
      ) {
        target = requested;
      }

      router.push(target);
    } else {
      toast.add({
        type: "error",
        description: "Incorrect Email or Password.",
        priority: "high",
      });
    }
  }

  const formik = useFormik<LogInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(logInSchema),
    onSubmit: handleLogIn,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
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

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-[#E8571F] underline-offset-2 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
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
            placeholder="Enter your password"
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

      <label className="flex items-center gap-2.5 text-sm text-[#4B5563]">
        <input
          type="checkbox"
          className="h-4 w-4 cursor-pointer rounded border-black/20 text-[#E8571F] focus:ring-[#E8571F]/30"
        />
        Remember me
      </label>

      <button
        type="submit"
        className="mt-2 group flex h-13 cursor-pointer w-full items-center justify-center gap-2 rounded-lg bg-[#E8571F] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] active:scale-[0.99]"
      >
        Log in
        <ArrowRight
          size={16}
          className="group-hover:translate-x-3 transition-all duration-200"
        />
      </button>

      <div className="relative flex items-center py-1">
        <div className="h-px w-full bg-black/10" />
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-[#9BA1AC]">
          or
        </span>
      </div>

      <button
        type="button"
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-black/10 bg-white text-sm font-semibold text-[#1F2937] transition-colors duration-150 hover:bg-[#F7F5F2]"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.8Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.1C3.24 21.3 7.28 24 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.26a12 12 0 0 0 0 10.78l4.01-3.1Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.61l4.01 3.1C6.22 6.86 8.87 4.75 12 4.75Z"
          />
        </svg>
        Continue with Google
      </button>
    </form>
  );
}
