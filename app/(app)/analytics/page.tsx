import { AnalyticsModule } from "@/components/modules/analytics-module";
import { getDashboardMetrics } from "@/features/dashboard/queries";

const AnalyticsPage = async () => {
  const metrics = await getDashboardMetrics();
  return (
    <AnalyticsModule
      activeClients={metrics.activeClients}
      monthlyExpense={metrics.monthlyExpense}
      monthlyIncome={metrics.monthlyIncome}
      openProposals={metrics.openProposals}
    />
  );
};

export default AnalyticsPage;
