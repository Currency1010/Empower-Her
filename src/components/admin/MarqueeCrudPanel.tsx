"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import AdminSurface from "@/components/admin/AdminSurface";
import ConfirmActionDialog from "@/components/admin/ConfirmActionDialog";
import MarqueeStrip from "@/components/MarqueeStrip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DEFAULT_MARQUEE_ENABLED,
  DEFAULT_MARQUEE_ITEMS,
  MARQUEE_ENABLED_STORAGE_KEY,
  MARQUEE_STORAGE_KEY,
} from "@/lib/marqueeConfig";

type MarqueeItem = {
  id: string;
  text: string;
};

const fallbackItems: MarqueeItem[] = DEFAULT_MARQUEE_ITEMS.map((text, index) => ({
  id: `m-${index + 1}`,
  text,
}));

function parseItems(raw: string | null): MarqueeItem[] {
  if (!raw) return fallbackItems;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return parsed.map((text, index) => ({ id: `m-${index + 1}`, text }));
    }
    return fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export default function MarqueeCrudPanel() {
  const [items, setItems] = useState<MarqueeItem[]>(fallbackItems);
  const [isEnabled, setIsEnabled] = useState(DEFAULT_MARQUEE_ENABLED);
  const [formText, setFormText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState<MarqueeItem | null>(null);
  const [pendingDeleteItem, setPendingDeleteItem] = useState<MarqueeItem | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const initial = parseItems(window.localStorage.getItem(MARQUEE_STORAGE_KEY));
    setItems(initial);
    const initialEnabled = window.localStorage.getItem(MARQUEE_ENABLED_STORAGE_KEY);
    setIsEnabled(initialEnabled === null ? DEFAULT_MARQUEE_ENABLED : initialEnabled === "true");
  }, []);

  const persist = (nextItems: MarqueeItem[]) => {
    setItems(nextItems);
    if (typeof window !== "undefined") {
      const raw = JSON.stringify(nextItems.map((item) => item.text));
      window.localStorage.setItem(MARQUEE_STORAGE_KEY, raw);
      window.dispatchEvent(new Event("marquee-items-updated"));
    }
  };

  const persistEnabled = (nextEnabled: boolean) => {
    setIsEnabled(nextEnabled);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MARQUEE_ENABLED_STORAGE_KEY, String(nextEnabled));
      window.dispatchEvent(new Event("marquee-items-updated"));
    }
  };

  const resetForm = () => {
    setFormText("");
    setEditingId(null);
    setError("");
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (item: MarqueeItem) => {
    setEditingId(item.id);
    setFormText(item.text);
    setError("");
    setFormOpen(true);
  };

  const saveItem = () => {
    const text = formText.trim();
    if (!text) {
      setError("Marquee text is required.");
      return;
    }

    if (editingId) {
      const next = items.map((item) => (item.id === editingId ? { ...item, text } : item));
      persist(next);
    } else {
      const next = [{ id: `m-${Date.now()}`, text }, ...items];
      persist(next);
    }

    setFormOpen(false);
    resetForm();
  };

  const deleteItem = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    persist(next.length > 0 ? next : fallbackItems);
  };

  return (
    <AdminSurface
      title="Marquee Content "
      subtitle="Manage the scrolling text displayed above the public navbar."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-700">
              Marquee {isEnabled ? "On" : "Off"}
            </span>
            <button
              type="button"
              aria-label="Toggle marquee visibility"
              onClick={() => persistEnabled(!isEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                isEnabled ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  isEnabled ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Marquee Text
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-700">{item.text}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewingItem(item)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
              <button
                type="button"
                onClick={() => openEdit(item)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <button
                type="button"
                onClick={() => setPendingDeleteItem(item)}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </div>
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
            <DialogTitle>{editingId ? "Edit Marquee Text" : "Create Marquee Text"}</DialogTitle>
            <DialogDescription>
              This text will appear in the scrolling strip above the public navbar.
            </DialogDescription>
          </DialogHeader>
          <textarea
            value={formText}
            onChange={(e) => setFormText(e.target.value)}
            placeholder="Enter marquee text..."
            rows={4}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
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
              onClick={saveItem}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {editingId ? "Update Text" : "Create Text"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingItem)} onOpenChange={(open) => !open && setViewingItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Marquee Text Preview</DialogTitle>
            <DialogDescription>Read-only preview for selected marquee text.</DialogDescription>
          </DialogHeader>
          {viewingItem ? <p className="text-sm text-slate-700">{viewingItem.text}</p> : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteItem)}
        onOpenChange={(open) => !open && setPendingDeleteItem(null)}
        title="Delete Marquee Text"
        description={
          pendingDeleteItem
            ? `This will remove: "${pendingDeleteItem.text}"`
            : "This will remove the selected marquee text."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteItem) {
            deleteItem(pendingDeleteItem.id);
          }
          setPendingDeleteItem(null);
        }}
        tone="danger"
      />
    </AdminSurface>
  );
}
