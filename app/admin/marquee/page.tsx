import AdminPageHeader from "@/components/admin/AdminPageHeader";
import MarqueeCrudPanel from "@/components/admin/MarqueeCrudPanel";

export default function MarqueeAdminPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Marquee Manager"
        description="Create and maintain marquee content shown above the public site navbar."
      />
      <MarqueeCrudPanel />
    </div>
  );
}
