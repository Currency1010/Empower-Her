import {
  ArrowUpRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock4,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminSurface from "@/components/admin/AdminSurface";

const statCards = [
  { title: "Total Donations", value: "N 8.4M", delta: "+18% this month", icon: CircleDollarSign },
  { title: "Active Volunteers", value: "126", delta: "+7 new this week", icon: Users },
  { title: "Programs Running", value: "09", delta: "+2 launched", icon: ClipboardCheck },
  { title: "Pending Approvals", value: "17", delta: "4 urgent", icon: Clock4, tone: "warning" as const },
];

const programs = [
  { name: "Girls Coding Cohort", progress: 72, manager: "Faith Chukwu", widthClass: "w-[72%]" },
  { name: "Youth Skills Bootcamp", progress: 48, manager: "Usman Bello", widthClass: "w-[48%]" },
  { name: "Women Micro-Grant Circle", progress: 83, manager: "Ruth Jonah", widthClass: "w-[83%]" },
];

const volunteerQueue = [
  { name: "Chinelo Okafor", role: "Mentorship", availability: "Mon - Wed" },
  { name: "Kabir Nuhu", role: "Career Counseling", availability: "Weekends" },
  { name: "Patience George", role: "Program Ops", availability: "Tue - Fri" },
];

const activityFeed = [
  "Program report uploaded for March impact cycle.",
  "15 new volunteer applications were received today.",
  "Website donation widget recorded a 22% conversion lift.",
  "Community event budget request is awaiting review.",
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Admin Overview"
        title="Impact Dashboard"
        description="Track your organization's pulse across donations, programs, volunteers, and outreach activities."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4" />
            Generate Report
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <AdminStatCard
            key={card.title}
            title={card.title}
            value={card.value}
            delta={card.delta}
            icon={card.icon}
            deltaTone={card.tone === "warning" ? "neutral" : "positive"}
          />
        ))}
      </section>

      <section className="space-y-6">
        <AdminSurface title="Program Pipeline">
          <div className="space-y-4">
            {programs.map((program) => (
              <div key={program.name} className="space-y-2.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-primary">{program.name}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Lead: {program.manager}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-secondary">{program.progress}%</p>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full bg-secondary ${program.widthClass}`} />
                </div>
              </div>
            ))}
          </div>
        </AdminSurface>

        <AdminSurface title="Quick Actions">
          <div className="grid gap-2">
            <button
              type="button"
              className="rounded-xl bg-primary px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Create New Program
            </button>
            <button
              type="button"
              className="rounded-xl border border-primary/25 bg-white px-4 py-3 text-left text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
            >
              Go to Donations Page
            </button>
            <button
              type="button"
              className="rounded-xl border border-primary/25 bg-white px-4 py-3 text-left text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
            >
              Add New Team Member
            </button>
          </div>
        </AdminSurface>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <AdminSurface
          title="Volunteer Queue"
          action={<UserPlus className="h-5 w-5 text-secondary" aria-hidden="true" />}
        >
          <div className="space-y-3">
            {volunteerQueue.map((person) => (
              <div key={person.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-primary">{person.name}</p>
                <p className="mt-1 text-sm text-slate-600">{person.role}</p>
                <p className="mt-2 inline-flex rounded-full bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                  {person.availability}
                </p>
              </div>
            ))}
          </div>
        </AdminSurface>

        <AdminSurface
          title="Live Activity"
          action={<ArrowUpRight className="h-5 w-5 text-secondary" aria-hidden="true" />}
        >
          <div className="space-y-3">
            {activityFeed.map((activity) => (
              <div key={activity} className="rounded-xl border border-primary/10 bg-primary/5 p-4 text-sm text-primary">
                {activity}
              </div>
            ))}
          </div>
        </AdminSurface>
      </section>
    </div>
  );
}
