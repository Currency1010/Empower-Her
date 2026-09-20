import { Users } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSurface from "@/components/admin/AdminSurface";
import VolunteersCrudPanel from "@/components/admin/VolunteersCrudPanel";

const queue = [
  { name: "Fadila James", role: "Education Support", submitted: "2 days ago" },
  { name: "Elijah Mark", role: "Community Outreach", submitted: "1 day ago" },
  { name: "Yetunde Adebayo", role: "Digital Literacy", submitted: "Today" },
];

export default function VolunteersAdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="People"
        title="Volunteers"
        description="Manage active volunteer profiles and new applications for programs."
      />

      <section className="grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <VolunteersCrudPanel />

        <AdminSurface title="Application Queue" action={<Users className="h-5 w-5 text-secondary" />}>
          <div className="space-y-3">
            {queue.map((item) => (
              <article key={item.name} className="rounded-xl border border-primary/10 bg-primary/5 p-4">
                <h3 className="font-semibold text-primary">{item.name}</h3>
                <p className="mt-1 text-sm text-slate-700">{item.role}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary/90"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                  >
                    Review
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">Submitted {item.submitted}</p>
              </article>
            ))}
          </div>
        </AdminSurface>
      </section>
    </div>
  );
}
