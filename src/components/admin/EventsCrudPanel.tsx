"use client";

import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import AdminSurface from "@/components/admin/AdminSurface";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmActionDialog from "@/components/admin/ConfirmActionDialog";

type EventStatus = "Upcoming" | "Completed" | "Cancelled";

type AdminEvent = {
  id: string;
  title: string;
  date: string;
  venue: string;
  attendance: string;
  status: EventStatus;
};

type EventForm = {
  title: string;
  date: string;
  venue: string;
  attendance: string;
  status: EventStatus;
};

const initialEvents: AdminEvent[] = [
  {
    id: "e-1",
    title: "Community Skills Fair",
    date: "20 Apr 2026",
    venue: "Jaba Civic Hall",
    attendance: "118 registered",
    status: "Upcoming",
  },
  {
    id: "e-2",
    title: "Women Leaders Roundtable",
    date: "26 Apr 2026",
    venue: "Youth Resource Center",
    attendance: "64 registered",
    status: "Upcoming",
  },
  {
    id: "e-3",
    title: "Digital Literacy Outreach",
    date: "05 Apr 2026",
    venue: "Sambam School",
    attendance: "91 attended",
    status: "Completed",
  },
];

const defaultForm: EventForm = {
  title: "",
  date: "",
  venue: "",
  attendance: "",
  status: "Upcoming",
};

export default function EventsCrudPanel() {
  const [events, setEvents] = useState<AdminEvent[]>(initialEvents);
  const [form, setForm] = useState<EventForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingEvent, setViewingEvent] = useState<AdminEvent | null>(null);
  const [pendingDeleteEvent, setPendingDeleteEvent] = useState<AdminEvent | null>(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setError("");
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (event: AdminEvent) => {
    setEditingId(event.id);
    setForm({
      title: event.title,
      date: event.date,
      venue: event.venue,
      attendance: event.attendance,
      status: event.status,
    });
    setError("");
    setFormOpen(true);
  };

  const saveEvent = () => {
    if (!form.title.trim() || !form.date.trim() || !form.venue.trim() || !form.attendance.trim()) {
      setError("Title, date, venue, and attendance are required.");
      return;
    }

    if (editingId) {
      setEvents((current) =>
        current.map((event) =>
          event.id === editingId
            ? {
                ...event,
                title: form.title.trim(),
                date: form.date.trim(),
                venue: form.venue.trim(),
                attendance: form.attendance.trim(),
                status: form.status,
              }
            : event
        )
      );
    } else {
      setEvents((current) => [
        {
          id: `e-${Date.now()}`,
          title: form.title.trim(),
          date: form.date.trim(),
          venue: form.venue.trim(),
          attendance: form.attendance.trim(),
          status: form.status,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    resetForm();
  };

  const deleteEvent = (id: string) => {
    setEvents((current) => current.filter((event) => event.id !== id));
    if (editingId === id) {
      setFormOpen(false);
      resetForm();
    }
  };

  return (
    <AdminSurface
      title="Events "
      subtitle="Create, view, edit, and delete event records in local mock state."
      action={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Event
        </button>
      }
    >
      <div className="space-y-3">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-primary/25"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-primary">{event.title}</h3>
                <p className="mt-1 text-sm text-slate-700">{event.venue}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{event.date}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-slate-600">{event.attendance}</p>
                <AdminStatusBadge
                  label={event.status}
                  tone={
                    event.status === "Completed"
                      ? "success"
                      : event.status === "Cancelled"
                        ? "danger"
                        : "info"
                  }
                />
                <button
                  type="button"
                  onClick={() => setViewingEvent(event)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(event)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDeleteEvent(event)}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Event" : "Create Event"}</DialogTitle>
            <DialogDescription>
              Manage event entries with modal-based CRUD behavior.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Event title"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              placeholder="Event date"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.venue}
              onChange={(e) => setForm((prev) => ({ ...prev, venue: e.target.value }))}
              placeholder="Venue"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.attendance}
              onChange={(e) => setForm((prev) => ({ ...prev, attendance: e.target.value }))}
              placeholder="Attendance summary"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              aria-label="Event status"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as EventStatus }))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none md:col-span-2"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <DialogFooter>
            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                resetForm();
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEvent}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {editingId ? "Update Event" : "Create Event"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingEvent)} onOpenChange={(open) => !open && setViewingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
            <DialogDescription>Read-only preview of selected event.</DialogDescription>
          </DialogHeader>
          {viewingEvent ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-primary">Title:</span> {viewingEvent.title}</p>
              <p><span className="font-semibold text-primary">Date:</span> {viewingEvent.date}</p>
              <p><span className="font-semibold text-primary">Venue:</span> {viewingEvent.venue}</p>
              <p><span className="font-semibold text-primary">Attendance:</span> {viewingEvent.attendance}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Status:</span>
                <AdminStatusBadge
                  label={viewingEvent.status}
                  tone={
                    viewingEvent.status === "Completed"
                      ? "success"
                      : viewingEvent.status === "Cancelled"
                        ? "danger"
                        : "info"
                  }
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteEvent)}
        onOpenChange={(open) => !open && setPendingDeleteEvent(null)}
        title="Delete Event"
        description={
          pendingDeleteEvent
            ? `This will permanently remove ${pendingDeleteEvent.title} from events.`
            : "This will permanently remove this event."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteEvent) {
            deleteEvent(pendingDeleteEvent.id);
          }
          setPendingDeleteEvent(null);
        }}
        tone="danger"
      />
    </AdminSurface>
  );
}
