"use client";

import { Lock, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const TABS = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "password", label: "Password", icon: Lock },
];

export default function SettingsTabs() {
  const { data: session } = useSession();
  const [active, setActive] = useState("profile");

  const name = session?.user?.name || "";
  const email = session?.user?.email || "";
  const initial = (name || email || "U").charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <aside className="flex flex-col gap-3 lg:sticky lg:top-18 lg:w-72 lg:shrink-0 lg:rounded-2xl lg:bg-white lg:p-4 lg:ring-1 lg:ring-black/5">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-black/5 lg:rounded-none lg:bg-transparent lg:p-2 lg:ring-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8571F] text-lg font-bold text-white">
            {initial}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1F2937]">
              {name || "Your account"}
            </p>
            <p className="truncate text-xs text-[#7A7A7A]">{email}</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map(function (tab) {
            const Icon = tab.icon;
            const isActive = active === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={function () {
                  setActive(tab.id);
                }}
                className={
                  "flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors lg:w-full " +
                  (isActive
                    ? "bg-[#E8571F] text-white"
                    : "bg-white text-[#1F2937] ring-1 ring-black/5 hover:bg-[#F7F5F2] lg:bg-transparent lg:ring-0")
                }
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="min-w-0 flex-1 rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-8">
        {active === "profile" ? <ProfileForm /> : <ChangePasswordForm />}
      </section>
    </div>
  );
}
