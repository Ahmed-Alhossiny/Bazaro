"use client";

import {
  ClipboardEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "@/components/ui/toast";
import SubmitButton from "@/components/ui/SubmitButton";
import { forgotPasswordAction } from "@/app/api/actions/authActions/ForgotPasswordAction";
import { verifyResetCodeAction } from "@/app/api/actions/authActions/VerifyResetCodeAction";

const LENGTH = 6;
const RESEND_SECONDS = 60;

function emptyDigits() {
  const list: string[] = [];

  for (let i = 0; i < LENGTH; i++) {
    list.push("");
  }

  return list;
}

export default function VerifyResetCodeForm({
  email,
  onVerified,
  onChangeEmail,
}: {
  email: string;
  onVerified: () => void;
  onChangeEmail: () => void;
}) {
  const [digits, setDigits] = useState<string[]>(emptyDigits());
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(
    function () {
      if (cooldown <= 0) return;

      const timer = setTimeout(function () {
        setCooldown(cooldown - 1);
      }, 1000);

      return function () {
        clearTimeout(timer);
      };
    },
    [cooldown],
  );

  useEffect(function () {
    inputsRef.current[0]?.focus();
  }, []);

  function fillFrom(startIndex: number, text: string) {
    const next = digits.slice();
    let last = startIndex;

    for (let i = 0; i < text.length && startIndex + i < LENGTH; i++) {
      next[startIndex + i] = text.charAt(i);
      last = startIndex + i;
    }

    setDigits(next);
    setError("");

    const focusIndex = last < LENGTH - 1 ? last + 1 : LENGTH - 1;
    inputsRef.current[focusIndex]?.focus();
  }

  function handleChange(index: number, value: string) {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned === "") {
      const next = digits.slice();
      next[index] = "";
      setDigits(next);
      return;
    }

    if (cleaned.length > 1) {
      fillFrom(index, cleaned);
      return;
    }

    fillFrom(index, cleaned);
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      const next = digits.slice();
      next[index - 1] = "";
      setDigits(next);
      inputsRef.current[index - 1]?.focus();
      e.preventDefault();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);

    if (pasted === "") return;

    const next = emptyDigits();

    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted.charAt(i);
    }

    setDigits(next);
    setError("");

    const focusIndex = pasted.length >= LENGTH ? LENGTH - 1 : pasted.length;
    inputsRef.current[focusIndex]?.focus();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const code = digits.join("");

    if (code.length < LENGTH) {
      setError("Enter the 6-digit code");
      return;
    }

    setLoading(true);

    const result = await verifyResetCodeAction(code);

    setLoading(false);

    if (result.ok) {
      onVerified();
    } else {
      setError(result.message);
      toast.add({
        type: "error",
        description: result.message,
        priority: "high",
      });
    }
  }

  async function handleResend() {
    if (cooldown > 0 || resending) return;

    setResending(true);

    const result = await forgotPasswordAction(email);

    setResending(false);

    if (result.ok) {
      toast.add({ type: "success", description: "A new code was sent." });
      setCooldown(RESEND_SECONDS);
      setDigits(emptyDigits());
      setError("");
      inputsRef.current[0]?.focus();
    } else {
      toast.add({
        type: "error",
        description: result.message,
        priority: "high",
      });
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 sm:gap-3">
          {digits.map(function (digit, index) {
            return (
              <input
                key={index}
                ref={function (el) {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                aria-label={"Digit " + (index + 1)}
                value={digit}
                onChange={function (e) {
                  handleChange(index, e.target.value);
                }}
                onKeyDown={function (e) {
                  handleKeyDown(index, e);
                }}
                onPaste={handlePaste}
                onFocus={function (e) {
                  e.target.select();
                }}
                className={
                  "h-12 min-w-0 flex-1 rounded-lg border bg-[#F7F5F2] text-center text-lg font-semibold text-[#1F2937] outline-none transition-all duration-150 focus:bg-white focus:ring-2 sm:h-14 sm:text-xl " +
                  (error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-black/10 focus:border-[#E8571F] focus:ring-[#E8571F]/10")
                }
              />
            );
          })}
        </div>
        {error ? (
          <p className="text-center text-xs text-red-500">{error}</p>
        ) : null}
      </div>

      <SubmitButton loading={loading}>Verify code</SubmitButton>

      <div className="flex flex-col items-center gap-2 text-sm sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || resending}
          className="cursor-pointer font-medium text-[#E8571F] transition-opacity hover:underline disabled:cursor-not-allowed disabled:text-[#8E93A0] disabled:no-underline"
        >
          {cooldown > 0 ? "Resend code in " + cooldown + "s" : "Resend code"}
        </button>
        <button
          type="button"
          onClick={onChangeEmail}
          className="cursor-pointer text-[#1F2937]/70 transition-colors hover:text-[#E8571F]"
        >
          Use a different email
        </button>
      </div>
    </form>
  );
}
