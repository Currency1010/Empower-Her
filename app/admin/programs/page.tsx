import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProgramsCrudPanel from "@/components/admin/ProgramsCrudPanel";

export default function ProgramsAdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Programs"
        title="Program Management"
        description="Track initiative progress, participant counts, and operational health across all active programs."
      />

      <ProgramsCrudPanel />
    </div>
  );
}
