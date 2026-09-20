import AdminPageHeader from "@/components/admin/AdminPageHeader";
import UsersCrudPanel from "@/components/admin/UsersCrudPanel";

export default function UsersAdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Access Control"
        title="Users & Roles"
        description="Manage admin users and assign role-based responsibilities across the platform."
      />
      <UsersCrudPanel />
    </div>
  );
}
