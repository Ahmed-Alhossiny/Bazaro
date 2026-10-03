import { redirect } from "next/navigation";
import { getAccessToken } from "@/utils/GetAccessToken";
import SettingsTabs from "@/components/ui/SettingsTabs";

export default async function SettingsPage() {
  const token = await getAccessToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
        <div className="mb-6">
          <h1
            className="text-2xl font-bold text-[#1F2937] sm:text-3xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Settings
          </h1>
          <p className="mt-1 text-sm text-[#7A7A7A]">
            Manage your account details and security.
          </p>
        </div>

        <SettingsTabs />
      </div>
    </div>
  );
}
