"use client";

import { useMemo, useState } from "react";
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

type DonationStatus = "Confirmed" | "Pending" | "Review";

type Donation = {
  id: string;
  donor: string;
  channel: string;
  amount: number;
  status: DonationStatus;
};

type DonationForm = {
  donor: string;
  channel: string;
  amount: string;
  status: DonationStatus;
};

const initialDonations: Donation[] = [
  { id: "d-1", donor: "Amina Yusuf", channel: "Bank Transfer", amount: 250000, status: "Confirmed" },
  { id: "d-2", donor: "Sani Foundation", channel: "Corporate", amount: 1300000, status: "Pending" },
  { id: "d-3", donor: "Ibrahim Danjuma", channel: "Card", amount: 75000, status: "Confirmed" },
  { id: "d-4", donor: "Anonymous", channel: "USSD", amount: 20000, status: "Review" },
];

const defaultForm: DonationForm = {
  donor: "",
  channel: "Bank Transfer",
  amount: "",
  status: "Pending",
};

function formatNaira(amount: number) {
  return `N ${amount.toLocaleString("en-NG")}`;
}

export default function DonationsCrudPanel() {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [form, setForm] = useState<DonationForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingDonation, setViewingDonation] = useState<Donation | null>(null);
  const [pendingDeleteDonation, setPendingDeleteDonation] = useState<Donation | null>(null);
  const [error, setError] = useState("");

  const totalAmount = useMemo(
    () => donations.reduce((sum, item) => sum + item.amount, 0),
    [donations]
  );

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setError("");
  };

  const openCreateForm = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEditForm = (donation: Donation) => {
    setEditingId(donation.id);
    setForm({
      donor: donation.donor,
      channel: donation.channel,
      amount: String(donation.amount),
      status: donation.status,
    });
    setError("");
    setFormOpen(true);
  };

  const handleSave = () => {
    const amountValue = Number(form.amount);

    if (!form.donor.trim() || !form.channel.trim()) {
      setError("Donor name and channel are required.");
      return;
    }

    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setError("Amount must be a valid number greater than zero.");
      return;
    }

    if (editingId) {
      setDonations((current) =>
        current.map((item) =>
          item.id === editingId
            ? {
                ...item,
                donor: form.donor.trim(),
                channel: form.channel.trim(),
                amount: amountValue,
                status: form.status,
              }
            : item
        )
      );
    } else {
      const nextId = `d-${Date.now()}`;
      setDonations((current) => [
        {
          id: nextId,
          donor: form.donor.trim(),
          channel: form.channel.trim(),
          amount: amountValue,
          status: form.status,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setDonations((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      setFormOpen(false);
      resetForm();
    }
  };

  return (
    <AdminSurface
      title="Recent Donations "
      subtitle="Manage mock donation records directly from the dashboard."
      action={
        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Donation
        </button>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-sm text-slate-600">Records: <span className="font-semibold text-primary">{donations.length}</span></p>
        <p className="text-sm text-slate-600">Total: <span className="font-semibold text-primary">{formatNaira(totalAmount)}</span></p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-primary/60">
              <th className="pb-3 font-semibold">Donor</th>
              <th className="pb-3 font-semibold">Channel</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donations.map((donation) => (
              <tr key={donation.id} className="text-sm text-slate-700">
                <td className="py-4 font-semibold text-primary">{donation.donor}</td>
                <td>{donation.channel}</td>
                <td className="font-semibold text-slate-900">{formatNaira(donation.amount)}</td>
                <td>
                  <AdminStatusBadge
                    label={donation.status}
                    tone={
                      donation.status === "Confirmed"
                        ? "success"
                        : donation.status === "Pending"
                          ? "warning"
                          : "info"
                    }
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewingDonation(donation)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditForm(donation)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDeleteDonation(donation)}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <DialogTitle>{editingId ? "Edit Donation" : "Create Donation"}</DialogTitle>
            <DialogDescription>
              Fill in donation details below. Data remains in local mock state.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={form.donor}
              onChange={(e) => setForm((prev) => ({ ...prev, donor: e.target.value }))}
              placeholder="Donor name"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              value={form.channel}
              onChange={(e) => setForm((prev) => ({ ...prev, channel: e.target.value }))}
              placeholder="Channel"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              type="number"
              min="1"
              value={form.amount}
              onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
              placeholder="Amount"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              aria-label="Donation status"
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as DonationStatus,
                }))
              }
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Review">Review</option>
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
              onClick={handleSave}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {editingId ? "Update Donation" : "Create Donation"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingDonation)} onOpenChange={(open) => !open && setViewingDonation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donation Details</DialogTitle>
            <DialogDescription>Read-only preview of selected donation record.</DialogDescription>
          </DialogHeader>
          {viewingDonation ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-primary">Donor:</span> {viewingDonation.donor}</p>
              <p><span className="font-semibold text-primary">Channel:</span> {viewingDonation.channel}</p>
              <p><span className="font-semibold text-primary">Amount:</span> {formatNaira(viewingDonation.amount)}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Status:</span>
                <AdminStatusBadge
                  label={viewingDonation.status}
                  tone={viewingDonation.status === "Confirmed" ? "success" : viewingDonation.status === "Pending" ? "warning" : "info"}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteDonation)}
        onOpenChange={(open) => !open && setPendingDeleteDonation(null)}
        title="Delete Donation Record"
        description={
          pendingDeleteDonation
            ? `This will permanently remove ${pendingDeleteDonation.donor}'s donation record.`
            : "This will permanently remove the donation record."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteDonation) {
            handleDelete(pendingDeleteDonation.id);
          }
          setPendingDeleteDonation(null);
        }}
        tone="danger"
      />
    </AdminSurface>
  );
}
