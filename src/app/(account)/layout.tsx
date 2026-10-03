import AccountLinks from "@/components/account/AccountLinks";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full rounded-[10px] max-w-7xl bg-[#F7F5F2] my-5 px-4 py-8 md:px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <aside>
          <AccountLinks />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
