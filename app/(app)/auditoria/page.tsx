import { AuditModule } from "@/components/modules/audit-module";
import { getAuditTrail } from "@/features/dashboard/queries";

const AuditoriaPage = async () => {
  const audits = await getAuditTrail();
  return <AuditModule audits={audits} />;
};

export default AuditoriaPage;
