"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Download, Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminSurface from "@/components/admin/AdminSurface";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import ConfirmActionDialog from "@/components/admin/ConfirmActionDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DonationStatus = "Confirmed" | "Pending" | "Review";
type StatusFilter = "All" | DonationStatus;

type Donation = {
  id: string;
  donor: string;
  channel: string;
  amount: number;
  date: string;
  status: DonationStatus;
};

type DonationForm = {
  donor: string;
  channel: string;
  amount: string;
  date: string;
  status: DonationStatus;
};

const initialDonations: Donation[] = [
  { id: "d-1", donor: "Amina Yusuf", channel: "Bank Transfer", amount: 250000, date: "12 Apr 2026", status: "Confirmed" },
  { id: "d-2", donor: "Sani Foundation", channel: "Corporate", amount: 1300000, date: "11 Apr 2026", status: "Pending" },
  { id: "d-3", donor: "Ibrahim Danjuma", channel: "Card", amount: 75000, date: "10 Apr 2026", status: "Confirmed" },
  { id: "d-4", donor: "Anonymous", channel: "USSD", amount: 20000, date: "10 Apr 2026", status: "Confirmed" },
  { id: "d-5", donor: "Fadila Umar", channel: "Bank Transfer", amount: 135000, date: "09 Apr 2026", status: "Review" },
];

const defaultForm: DonationForm = {
  donor: "",
  channel: "Bank Transfer",
  amount: "",
  date: "",
  status: "Pending",
};

function formatNaira(amount: number) {
  return `N ${amount.toLocaleString("en-NG")}`;
}

export default function DonationsAdminPage() {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [form, setForm] = useState<DonationForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingDonation, setViewingDonation] = useState<Donation | null>(null);
  const [pendingDeleteDonation, setPendingDeleteDonation] = useState<Donation | null>(null);
  const [error, setError] = useState("");

  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      const matchesQuery = item.donor.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" ? true : item.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [donations, query, statusFilter]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setError("");
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (donation: Donation) => {
    setEditingId(donation.id);
    setForm({
      donor: donation.donor,
      channel: donation.channel,
      amount: String(donation.amount),
      date: donation.date,
      status: donation.status,
    });
    setError("");
    setFormOpen(true);
  };

  const saveDonation = () => {
    const parsedAmount = Number(form.amount);

    if (!form.donor.trim() || !form.channel.trim() || !form.date.trim()) {
      setError("Donor, channel, and date are required.");
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
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
                amount: parsedAmount,
                date: form.date.trim(),
                status: form.status,
              }
            : item
        )
      );
    } else {
      setDonations((current) => [
        {
          id: `d-${Date.now()}`,
          donor: form.donor.trim(),
          channel: form.channel.trim(),
          amount: parsedAmount,
          date: form.date.trim(),
          status: form.status,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    resetForm();
  };

  const deleteDonation = (id: string) => {
    setDonations((current) => current.filter((item) => item.id !== id));
    if (editingId === id) {
      setFormOpen(false);
      resetForm();
    }
  };

  const markAsConfirmed = (id: string) => {
    setDonations((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "Confirmed" } : item))
    );
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Finance"
        title="Donations"
        description="View and track all incoming donations across channels. This page is currently UI-only and ready for API integration."
        action={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-4 py-2.5 text-sm font-semibold text-primary transition hover:border-secondary hover:text-secondary"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        }
      />

      <AdminSurface>
        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search donor name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none"
            />
          </label>
          <select
            aria-label="Filter donations by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 focus:border-primary focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Review">Review</option>
          </select>
          <button
            type="button"
            onClick={openCreate}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90"
          >
            <span className="inline-flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Record
            </span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-primary/60">
                <th className="pb-3 font-semibold">Donor</th>
                <th className="pb-3 font-semibold">Channel</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDonations.map((donation) => (
                <tr key={donation.id} className="text-sm text-slate-700">
                  <td className="py-4 font-semibold text-primary">{donation.donor}</td>
                  <td>{donation.channel}</td>
                  <td className="font-semibold text-slate-900">{formatNaira(donation.amount)}</td>
                  <td>{donation.date}</td>
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
                    <div className="flex flex-wrap items-center gap-2">
                      {donation.status !== "Confirmed" ? (
                        <button
                          type="button"
                          onClick={() => markAsConfirmed(donation.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Confirm
                        </button>
                      ) : null}
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
                        onClick={() => openEdit(donation)}
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
      </AdminSurface>

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
              Manage donations with full CRUD behavior on this page.
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
            <input
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              placeholder="Date (e.g. 21 Apr 2026)"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              aria-label="Donation status"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as DonationStatus }))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none md:col-span-2"
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
              onClick={saveDonation}
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
            <DialogDescription>Read-only preview for selected donation.</DialogDescription>
          </DialogHeader>
          {viewingDonation ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-primary">Donor:</span> {viewingDonation.donor}</p>
              <p><span className="font-semibold text-primary">Channel:</span> {viewingDonation.channel}</p>
              <p><span className="font-semibold text-primary">Amount:</span> {formatNaira(viewingDonation.amount)}</p>
              <p><span className="font-semibold text-primary">Date:</span> {viewingDonation.date}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Status:</span>
                <AdminStatusBadge
                  label={viewingDonation.status}
                  tone={
                    viewingDonation.status === "Confirmed"
                      ? "success"
                      : viewingDonation.status === "Pending"
                        ? "warning"
                        : "info"
                  }
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteDonation)}
        onOpenChange={(open) => !open && setPendingDeleteDonation(null)}
        title="Delete Donation"
        description={
          pendingDeleteDonation
            ? `This will permanently remove ${pendingDeleteDonation.donor}'s donation record.`
            : "This will permanently remove this donation record."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteDonation) {
            deleteDonation(pendingDeleteDonation.id);
          }
          setPendingDeleteDonation(null);
        }}
        tone="danger"
      />
    </div>
  );
}
