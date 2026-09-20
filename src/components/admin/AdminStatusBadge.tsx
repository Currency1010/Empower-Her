import { cn } from "@/lib/utils";

type AdminStatusBadgeProps = {
  label: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
};

const toneClasses = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-rose-50 text-rose-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-slate-100 text-slate-700",
};

export default function AdminStatusBadge({
  label,
  tone = "neutral",
}: AdminStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        toneClasses[tone]
      )}
    >
      {label}
    </span>
  );
}
