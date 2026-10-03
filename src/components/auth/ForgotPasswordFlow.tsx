"use client";

import { ArrowLeft, Check, KeyRound, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import VerifyResetCodeForm from "./VerifyResetCodeForm";
import ResetPasswordForm from "./ResetPasswordForm";

const STEPS = ["Email", "Verify", "Reset"];

const HEADERS = [
  {
    icon: Mail,
    title: "Forgot your password?",
    text: "Enter your email and we'll send you a 6-digit reset code.",
  },
  {
    icon: ShieldCheck,
    title: "Check your email",
    text: "",
  },
  {
    icon: KeyRound,
    title: "Create a new password",
    text: "Choose a password you haven't used before.",
  },
];

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  function handleCodeSent(enteredEmail: string) {
    setEmail(enteredEmail);
    setStep(2);
  }

  function handleVerified() {
    setStep(3);
  }

  function handleChangeEmail() {
    setStep(1);
  }

  const current = HEADERS[step - 1];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
      <div className="mb-8 flex items-center">
        {STEPS.map(function (label, index) {
          const number = index + 1;
          const done = step > number;
          const active = step === number;
          const isLast = index === STEPS.length - 1;

          let circleClasses =
            "bg-[#F7F5F2] text-[#8E93A0] ring-1 ring-black/10";
          if (done) {
            circleClasses = "bg-[#0EA5A0] text-white";
          } else if (active) {
            circleClasses = "bg-[#E8571F] text-white";
          }

          return (
            <div
              key={label}
              className={"flex items-center " + (isLast ? "" : "flex-1")}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors " +
                    circleClasses
                  }
                >
                  {done ? <Check size={14} /> : number}
                </div>
                <span className="text-[11px] font-medium text-[#1F2937]/60">
                  {label}
                </span>
              </div>
              {isLast ? null : (
                <div
                  className={
                    "mx-2 mb-5 h-0.5 flex-1 rounded transition-colors " +
                    (done ? "bg-[#0EA5A0]" : "bg-black/10")
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8571F]/10 text-[#E8571F]">
          <Icon size={26} />
        </div>
        <h1
          className="text-2xl font-bold text-[#1F2937]"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {current.title}
        </h1>
        {step === 2 ? (
          <p className="mt-2 text-sm text-[#7A7A7A]">
            We sent a 6-digit code to{" "}
            <span className="font-semibold break-all text-[#1F2937]">
              {email}
            </span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-[#7A7A7A]">{current.text}</p>
        )}
      </div>

      {step === 1 ? (
        <ForgotPasswordForm defaultEmail={email} onSuccess={handleCodeSent} />
      ) : null}

      {step === 2 ? (
        <VerifyResetCodeForm
          email={email}
          onVerified={handleVerified}
          onChangeEmail={handleChangeEmail}
        />
      ) : null}

      {step === 3 ? <ResetPasswordForm email={email} /> : null}

      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-[#1F2937]/70 transition-colors hover:text-[#E8571F]"
      >
        <ArrowLeft size={14} />
        Back to log in
      </Link>
    </div>
  );
}
