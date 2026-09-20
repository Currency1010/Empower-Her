import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="font-body text-xs uppercase tracking-[0.35em] text-primary/70">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1 font-heading text-3xl font-bold text-primary">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
