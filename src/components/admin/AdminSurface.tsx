import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AdminSurfaceProps = {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function AdminSurface({
  title,
  subtitle,
  action,
  children,
  className,
}: AdminSurfaceProps) {
  return (
    <section className={cn("rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6", className)}>
      {title || subtitle || action ? (
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            {title ? <h2 className="font-heading text-2xl font-bold text-primary">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
