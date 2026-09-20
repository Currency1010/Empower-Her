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

type UserRole = "Admin" | "Program Manager" | "Content Editor";
type UserStatus = "Active" | "Inactive";
type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  department: string;
};

type UserForm = {
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  department: string;
};

const initialUsers: AdminUser[] = [
  {
    id: "u-1",
    fullName: "Grace Samuel",
    email: "grace@risinglights.org",
    role: "Admin",
    status: "Active",
    department: "Operations",
  },
  {
    id: "u-2",
    fullName: "Faith Chukwu",
    email: "faith@risinglights.org",
    role: "Program Manager",
    status: "Active",
    department: "Programs",
  },
  {
    id: "u-3",
    fullName: "Michael Okon",
    email: "michael@risinglights.org",
    role: "Content Editor",
    status: "Inactive",
    department: "Communications",
  },
];

const defaultForm: UserForm = {
  fullName: "",
  email: "",
  role: "Program Manager",
  status: "Active",
  department: "",
};

const roleOptions: UserRole[] = ["Admin", "Program Manager", "Content Editor"];

export default function UsersCrudPanel() {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [form, setForm] = useState<UserForm>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<AdminUser | null>(null);
  const [pendingDeleteUser, setPendingDeleteUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState("");

  const filteredUsers = useMemo(() => users, [users]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setError("");
  };

  const openCreate = () => {
    resetForm();
    setFormOpen(true);
  };

  const openEdit = (user: AdminUser) => {
    setEditingId(user.id);
    setForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
    });
    setError("");
    setFormOpen(true);
  };

  const saveUser = () => {
    if (!form.fullName.trim() || !form.email.trim() || !form.department.trim()) {
      setError("Full name, email, and department are required.");
      return;
    }

    const isEmailValid = /\S+@\S+\.\S+/.test(form.email.trim());
    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      return;
    }

    if (editingId) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingId
            ? {
                ...user,
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                role: form.role,
                status: form.status,
                department: form.department.trim(),
              }
            : user
        )
      );
    } else {
      setUsers((current) => [
        {
          id: `u-${Date.now()}`,
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          role: form.role,
          status: form.status,
          department: form.department.trim(),
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    resetForm();
  };

  const deleteUser = (id: string) => {
    setUsers((current) => current.filter((user) => user.id !== id));
    if (editingId === id) {
      setFormOpen(false);
      resetForm();
    }
  };

  return (
    <AdminSurface
      title="User Management (Role-Based)"
      subtitle="Manage admin users and assign role scopes in local mock state."
      action={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.2em] text-primary/60">
              <th className="pb-3 font-semibold">Name</th>
              <th className="pb-3 font-semibold">Email</th>
              <th className="pb-3 font-semibold">Role</th>
              <th className="pb-3 font-semibold">Department</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="text-sm text-slate-700">
                <td className="py-4 font-semibold text-primary">{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <AdminStatusBadge
                    label={user.role}
                    tone={
                      user.role === "Admin"
                        ? "danger"
                        : user.role === "Program Manager"
                          ? "info"
                          : "neutral"
                    }
                  />
                </td>
                <td>{user.department}</td>
                <td>
                  <AdminStatusBadge
                    label={user.status}
                    tone={user.status === "Active" ? "success" : "warning"}
                  />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewingUser(user)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => openEdit(user)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDeleteUser(user)}
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
            <DialogTitle>{editingId ? "Edit User" : "Create User"}</DialogTitle>
            <DialogDescription>
              Manage role assignment for Admin, Program Manager, and Content Editor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 md:grid-cols-2">
            <input
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="Full name"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <select
              aria-label="User role"
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as UserRole }))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              aria-label="User status"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as UserStatus }))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              value={form.department}
              onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
              placeholder="Department"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none md:col-span-2"
            />
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
              onClick={saveUser}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              {editingId ? "Update User" : "Create User"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(viewingUser)} onOpenChange={(open) => !open && setViewingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Read-only preview of selected user profile.</DialogDescription>
          </DialogHeader>
          {viewingUser ? (
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-primary">Full Name:</span> {viewingUser.fullName}</p>
              <p><span className="font-semibold text-primary">Email:</span> {viewingUser.email}</p>
              <p><span className="font-semibold text-primary">Department:</span> {viewingUser.department}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Role:</span>
                <AdminStatusBadge
                  label={viewingUser.role}
                  tone={
                    viewingUser.role === "Admin"
                      ? "danger"
                      : viewingUser.role === "Program Manager"
                        ? "info"
                        : "neutral"
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary">Status:</span>
                <AdminStatusBadge
                  label={viewingUser.status}
                  tone={viewingUser.status === "Active" ? "success" : "warning"}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <ConfirmActionDialog
        open={Boolean(pendingDeleteUser)}
        onOpenChange={(open) => !open && setPendingDeleteUser(null)}
        title="Delete User"
        description={
          pendingDeleteUser
            ? `This will permanently remove ${pendingDeleteUser.fullName} from user management.`
            : "This will permanently remove this user."
        }
        confirmLabel="Delete"
        onConfirm={() => {
          if (pendingDeleteUser) {
            deleteUser(pendingDeleteUser.id);
          }
          setPendingDeleteUser(null);
        }}
        tone="danger"
      />
    </AdminSurface>
  );
}
