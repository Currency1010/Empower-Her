import type { LucideIcon } from "lucide-react";

type AdminStatCardProps = {
  title: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "neutral" | "negative";
  icon: LucideIcon;
};

const deltaToneClasses = {
  positive: "bg-emerald-50 text-emerald-700",
  neutral: "bg-slate-100 text-slate-700",
  negative: "bg-rose-50 text-rose-700",
};

export default function AdminStatCard({
  title,
  value,
  delta,
  deltaTone = "neutral",
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.25em] text-primary/70">{title}</p>
          <p className="mt-3 font-heading text-3xl font-bold text-primary">{value}</p>
        </div>
        <div className="rounded-xl bg-secondary/15 p-2.5 text-secondary">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {delta ? (
        <p
          className={`mt-4 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${deltaToneClasses[deltaTone]}`}
        >
          {delta}
        </p>
      ) : null}
    </article>
  );
}
