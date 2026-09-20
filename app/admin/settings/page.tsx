import { BellRing, Palette, ShieldCheck } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSurface from "@/components/admin/AdminSurface";

export default function SettingsAdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Manage organization preferences and admin workspace behavior. All controls are currently UI-only."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <AdminSurface title="Organization Profile" action={<ShieldCheck className="h-5 w-5 text-secondary" />}>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Organization Name</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contact Email</p>
              <p className="mt-1 text-slate-700">admin@risinglights.org</p>
            </div>
            <button
              type="button"
              className="rounded-xl border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
            >
              Edit Profile
            </button>
          </div>
        </AdminSurface>

        <AdminSurface title="Notification Preferences" action={<BellRing className="h-5 w-5 text-secondary" />}>
          <div className="space-y-3">
            {["Donation alerts", "Volunteer approvals", "Program reports"].map((item) => (
              <label key={item} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </label>
            ))}
          </div>
        </AdminSurface>

        <AdminSurface title="Appearance" action={<Palette className="h-5 w-5 text-secondary" />}>
          <div className="space-y-3">
            <button
              type="button"
              className="w-full rounded-xl border border-primary bg-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              Brand Default
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Compact Density
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              High Contrast
            </button>
          </div>
        </AdminSurface>
      </div>
    </div>
  );
}
