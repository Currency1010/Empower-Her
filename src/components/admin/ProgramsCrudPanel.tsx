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

type ProgramStatus = "Active" | "Planning" | "Paused";

type Program = {
  id: string;
  title: string;
  manager: string;
  participants: number;
  progress: number;
  status: ProgramStatus;
};

type ProgramForm = {
  title: string;
  manager: string;
  participants: string;
  progress: string;
  status: ProgramStatus;
};

const initialPrograms: Program[] = [
  { id: "p-1", title: "Girls Coding Cohort", manager: "Faith Chukwu", participants: 64, progress: 72, status: "Active" },
  { id: "p-2", title: "Youth Skills Bootcamp", manager: "Usman Bello", participants: 42, progress: 48, status: "Planning" },
  { id: "p-3", title: "Women Micro-Grant Circle", manager: "Ruth Jonah", participants: 31, progress: 83, status: "Active" },
];

const defaultForm: ProgramForm = {
  title: "",
  manager: "",
  participants: "",
  progress: "",
  status: "Planning",
};

function progressWidthClass(progress: number) {
  if (progress >= 100) return "w-full";
  if (progress >= 95) return "w-[95%]";
  if (progress >= 90) return "w-[90%]";
  if (progress >= 85) return "w-[85%]";
  if (progress >= 80) return "w-[80%]";
  if (progress >= 75) return "w-[75%]";
  if (progress >= 70) return "w-[70%]";
  if (progress >= 65) return "w-[65%]";
  if (progress >= 60) return "w-[60%]";
  if (progress >= 55) return "w-[55%]";
  if (progress >= 50) return "w-1/2";
  if (progress >= 45) return "w-[45%]";
  if (progress >= 40) return "w-[40%]";
  if (progress >= 35) return "w-[35%]";
  if (progress >= 30) return "w-[30%]";
  if (progress >= 25) return "w-1/4";
  if (progress >= 20) return "w-1/5";
  if (progress >= 15) return "w-[15%]";
  if (progress >= 10) return "w-[10%]";
  return "w-[5%]";
}

export default function ProgramsCrudPanel() {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [form, setForm] = useState<ProgramForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingProgram, setViewingProgram] = useState<Program | null>(null);
  const [pendingDeleteProgram, setPendingDeleteProgram] = useState<Program | null>(null);
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

  const openEdit = (item: Program) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      manager: item.manager,
      participants: String(item.participants),
      progress: String(item.progress),
      status: item.status,
    });
    setFormOpen(true);
  };

  const saveProgram = () => {
    const participants = Number(form.participants);
    const progress = Number(form.progress);

    if (!form.title.trim() || !form.manager.trim()) {
      setError("Program title and manager are required.");
      return;
    }

    if (!Number.isFinite(participants) || participants < 0) {
      setError("Participants must be a valid number (0 or more).");
      return;
    }

    if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
      setError("Progress must be between 0 and 100.");
      return;
    }

    if (editingId) {
      setPrograms((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title: form.title.trim(),
                manager: form.manager.trim(),
                participants,
                progress,
                status: form.status,
              }
            : item
        )
      );
    } else {
      setPrograms((current) => [
        {
          id: `p-${Date.now()}`,
          title: form.title.trim(),
          manager: form.manager.trim(),
          participants,
          progress,
          status: form.status,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    resetForm();
  };

  const deleteProgram = (id: string) => {
    setPrograms((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      setFormOpen(false);
      resetForm();
    }
  };

  return (
    <AdminSurface
      title="Programs "
      subtitle="Manage mock programs and track participation/progress locally."
      action={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Program
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => (
          <article key={program.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary">{program.title}</h3>
                <p className="mt-1 text-sm text-slate-600">Manager: {program.manager}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewingProgram(program)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-primary hover:text-primary"
                  aria-label={`View ${program.title}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openEdit(program)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition hover:border-primary hover:text-primary"
                  aria-label={`Edit ${program.title}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPendingDeleteProgram(program)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 text-rose-600 transition hover:bg-rose-50"
                  aria-label={`Delete ${program.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <p className="text-slate-600">Participants</p>
              <p className="font-semibold text-primary">{program.participants}</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-2.5 overflow-hidden rounded-full bg-white">
                <div className={`h-full rounded-full bg-secondary ${progressWidthClass(program.progress)}`} />
              </div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Progress: {program.progress}%
              </p>
            </div>
            <div className="mt-4">
              <AdminStatusBadge
                label={program.status}
                tone={program.status === "Active" ? "success" : program.status === "Planning" ? "info" : "warning"}
              />
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
            <DialogTitle>{editingId ? "Edit Program" : "Create Program"}</DialogTitle>
            <DialogDescription>
              Update program details in mock local state.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Program title"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.manager}
              onChange={(e) => setForm((prev) => ({ ...prev, manager: e.target.value }))}
              placeholder="Program manager"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              type="number"
              min="0"
              value={form.participants}
              onChange={(e) => setForm((prev) => ({ ...prev, participants: e.target.value }))}
              placeholder="Participants"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              type="number"
              min="0"
              max="100"
              value={form.progress}
              onChange={(e) => setForm((prev) => ({ ...prev, progress: e.target.value }))}
              placeholder="Progress %"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              aria-label="Program status"
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as ProgramStatus,
                }))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none md:col-span-2"
            >
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
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
              onClick={saveProgram}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {editingId ? "Update Program" : "Create Program"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingProgram)} onOpenChange={(open) => !open && setViewingProgram(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Program Details</DialogTitle>
            <DialogDescription>Read-only preview of selected program.</DialogDescription>
          </DialogHeader>
          {viewingProgram ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-primary">Title:</span> {viewingProgram.title}</p>
              <p><span className="font-semibold text-primary">Manager:</span> {viewingProgram.manager}</p>
              <p><span className="font-semibold text-primary">Participants:</span> {viewingProgram.participants}</p>
              <p><span className="font-semibold text-primary">Progress:</span> {viewingProgram.progress}%</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Status:</span>
                <AdminStatusBadge
                  label={viewingProgram.status}
                  tone={viewingProgram.status === "Active" ? "success" : viewingProgram.status === "Planning" ? "info" : "warning"}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteProgram)}
        onOpenChange={(open) => !open && setPendingDeleteProgram(null)}
        title="Delete Program"
        description={
          pendingDeleteProgram
            ? `This will permanently remove ${pendingDeleteProgram.title} from programs.`
            : "This will permanently remove this program."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteProgram) {
            deleteProgram(pendingDeleteProgram.id);
          }
          setPendingDeleteProgram(null);
        }}
        tone="danger"
      />
    </AdminSurface>
  );
}
