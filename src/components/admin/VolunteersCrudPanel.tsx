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

type VolunteerStatus = "Active" | "Pending" | "Inactive";

type Volunteer = {
  id: string;
  name: string;
  focus: string;
  location: string;
  status: VolunteerStatus;
};

type VolunteerForm = {
  name: string;
  focus: string;
  location: string;
  status: VolunteerStatus;
};

const initialVolunteers: Volunteer[] = [
  { id: "v-1", name: "Chinelo Okafor", focus: "Mentorship", location: "Kwoi", status: "Active" },
  { id: "v-2", name: "Kabir Nuhu", focus: "Career Counseling", location: "Sambam", status: "Active" },
  { id: "v-3", name: "Patience George", focus: "Program Ops", location: "Ankung", status: "Pending" },
  { id: "v-4", name: "Musa Garba", focus: "Logistics", location: "Jaba Town", status: "Inactive" },
];

const defaultForm: VolunteerForm = {
  name: "",
  focus: "",
  location: "",
  status: "Pending",
};

export default function VolunteersCrudPanel() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [form, setForm] = useState<VolunteerForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingVolunteer, setViewingVolunteer] = useState<Volunteer | null>(null);
  const [pendingDeleteVolunteer, setPendingDeleteVolunteer] = useState<Volunteer | null>(null);
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

  const openEdit = (item: Volunteer) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      focus: item.focus,
      location: item.location,
      status: item.status,
    });
    setFormOpen(true);
  };

  const saveVolunteer = () => {
    if (!form.name.trim() || !form.focus.trim() || !form.location.trim()) {
      setError("Name, focus area, and location are required.");
      return;
    }

    if (editingId) {
      setVolunteers((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: form.name.trim(),
                focus: form.focus.trim(),
                location: form.location.trim(),
                status: form.status,
              }
            : item
        )
      );
    } else {
      setVolunteers((current) => [
        {
          id: `v-${Date.now()}`,
          name: form.name.trim(),
          focus: form.focus.trim(),
          location: form.location.trim(),
          status: form.status,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    resetForm();
  };

  const deleteVolunteer = (id: string) => {
    setVolunteers((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      setFormOpen(false);
      resetForm();
    }
  };

  return (
    <AdminSurface
      title="Volunteer Directory "
      subtitle="Create, edit, and remove volunteer records with local mock state."
      action={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Volunteer
        </button>
      }
    >
      <div className="space-y-3">
        {volunteers.map((volunteer) => (
          <article key={volunteer.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-primary">{volunteer.name}</h3>
                <p className="text-sm text-slate-600">{volunteer.focus}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  Location: {volunteer.location}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <AdminStatusBadge
                  label={volunteer.status}
                  tone={
                    volunteer.status === "Active"
                      ? "success"
                      : volunteer.status === "Pending"
                        ? "warning"
                        : "neutral"
                  }
                />
                <button
                  type="button"
                  onClick={() => setViewingVolunteer(volunteer)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(volunteer)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDeleteVolunteer(volunteer)}
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
            <DialogTitle>{editingId ? "Edit Volunteer" : "Create Volunteer"}</DialogTitle>
            <DialogDescription>
              Manage volunteer details using mock local state.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Volunteer name"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.focus}
              onChange={(e) => setForm((prev) => ({ ...prev, focus: e.target.value }))}
              placeholder="Focus area"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.location}
              onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="Location"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              aria-label="Volunteer status"
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as VolunteerStatus,
                }))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              onClick={saveVolunteer}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {editingId ? "Update Volunteer" : "Create Volunteer"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingVolunteer)} onOpenChange={(open) => !open && setViewingVolunteer(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Volunteer Details</DialogTitle>
            <DialogDescription>Read-only preview of selected volunteer.</DialogDescription>
          </DialogHeader>
          {viewingVolunteer ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-primary">Name:</span> {viewingVolunteer.name}</p>
              <p><span className="font-semibold text-primary">Focus:</span> {viewingVolunteer.focus}</p>
              <p><span className="font-semibold text-primary">Location:</span> {viewingVolunteer.location}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Status:</span>
                <AdminStatusBadge
                  label={viewingVolunteer.status}
                  tone={viewingVolunteer.status === "Active" ? "success" : viewingVolunteer.status === "Pending" ? "warning" : "neutral"}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteVolunteer)}
        onOpenChange={(open) => !open && setPendingDeleteVolunteer(null)}
        title="Delete Volunteer"
        description={
          pendingDeleteVolunteer
            ? `This will permanently remove ${pendingDeleteVolunteer.name} from the volunteer directory.`
            : "This will permanently remove this volunteer."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteVolunteer) {
            deleteVolunteer(pendingDeleteVolunteer.id);
          }
          setPendingDeleteVolunteer(null);
        }}
        tone="danger"
      />
    </AdminSurface>
  );
}
