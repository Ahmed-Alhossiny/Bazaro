"use client";

import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FocusEvent, ReactNode, useState } from "react";

export default function FormField({
  id,
  label,
  type = "text",
  icon,
  placeholder,
  value,
  error,
  autoComplete,
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  type?: string;
  icon: ReactNode;
  placeholder?: string;
  value: string;
  error?: string;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-[#1F2937]"
      >
        {label}
      </label>
      <div
        className={
          "flex h-12 items-center rounded-lg border bg-[#F7F5F2] px-4 transition-all duration-150 focus-within:bg-white focus-within:ring-2 " +
          (error
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
            : "border-black/10 focus-within:border-[#E8571F] focus-within:ring-[#E8571F]/10")
        }
      >
        <span className="mr-3 shrink-0 text-[#8E93A0]">{icon}</span>
        <input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full min-w-0 bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#9BA1AC]"
        />
        {isPassword ? (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow(!show)}
            className="ml-2 shrink-0 cursor-pointer text-[#8E93A0] hover:text-[#1F2937]"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
