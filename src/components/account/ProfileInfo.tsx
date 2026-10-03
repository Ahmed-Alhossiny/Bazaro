"use client";

import { useSession } from "next-auth/react";

export default function ProfileInfo() {
  const { status, data: sessionData } = useSession();

  if (status === "loading") {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-sm text-[#7A7A7A]">Loading profile...</p>
      </div>
    );
  }

  const session: any = sessionData;
  const fullName = session?.user?.name || "";
  const email = session?.user?.email || "";
  const id = session?.user?.id || "";
  const userInitial = fullName ? fullName.charAt(0).toUpperCase() : "";

  const fields = [
    { label: "Full Name", value: fullName },
    { label: "Email", value: email },
    { label: "User ID", value: id },
    { label: "Role", value: "User" },
  ];

  const rows = [];

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    rows.push(
      <div
        key={field.label}
        className="flex flex-col gap-1 border-b border-[#E5E5E5] py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="text-sm font-medium text-[#7A7A7A]">
          {field.label}
        </span>
        <span className="break-all text-sm font-semibold text-[#1A1A1A] sm:text-right">
          {field.value || "-"}
        </span>
      </div>,
    );
  }

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-4 border-b border-[#E5E5E5] pb-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#E8571F] text-3xl font-semibold text-white">
          {userInitial}
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-[#1F2937]">
            {fullName || "My Profile"}
          </h1>
          <span className="mt-1 inline-block rounded-full bg-[#0EA5A0]/10 px-3 py-0.5 text-xs font-medium text-[#0EA5A0]">
            User
          </span>
        </div>
      </div>

      <div>{rows}</div>
    </section>
  );
}
