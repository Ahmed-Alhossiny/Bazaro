import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export default function SubmitButton({
  loading,
  disabled = false,
  children,
}: {
  loading: boolean;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8571F] text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#D14A16] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : null}
      {children}
    </button>
  );
}
