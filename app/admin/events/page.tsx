import { CalendarDays } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSurface from "@/components/admin/AdminSurface";
import EventsCrudPanel from "@/components/admin/EventsCrudPanel";

export default function EventsAdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Calendar"
        title="Events"
        description="Coordinate community events, attendance, and logistics in one timeline."
      />

      <EventsCrudPanel />

      <AdminSurface
        title="Upcoming Week Snapshot"
        action={<CalendarDays className="h-5 w-5 text-secondary" />}
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {["Mon", "Tue", "Wed", "Thu"].map((day) => (
            <div key={day} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-primary">{day}</p>
              <p className="mt-2 text-sm text-slate-600">No conflicts reported</p>
            </div>
          ))}
        </div>
      </AdminSurface>
    </div>
  );
}
