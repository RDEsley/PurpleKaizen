import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/utils";

type DashboardMetricsProps = {
  activeClients: number;
  leads: number;
  pendingTasks: number;
  openProposals: number;
  monthlyIncome: number;
  monthlyExpense: number;
};

const MetricCard = ({
  title,
  value,
  helper
}: {
  title: string;
  value: string | number;
  helper: string;
}) => (
  <Card>
    <CardHeader className="border-none pb-0">
      <CardTitle className="text-sm text-slate-500">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{helper}</p>
    </CardContent>
  </Card>
);

export const DashboardMetrics = ({
  activeClients,
  leads,
  pendingTasks,
  openProposals,
  monthlyIncome,
  monthlyExpense
}: DashboardMetricsProps) => (
  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    <MetricCard helper="Clientes com contrato ativo" title="Clientes ativos" value={activeClients} />
    <MetricCard helper="Negocios em prospeccao" title="Leads" value={leads} />
    <MetricCard helper="Tarefas de follow-up abertas" title="Pendencias" value={pendingTasks} />
    <MetricCard helper="Em draft ou enviado" title="Propostas abertas" value={openProposals} />
    <MetricCard helper="Receitas no mes atual" title="Receita mensal" value={currencyFormatter.format(monthlyIncome)} />
    <MetricCard helper="Custos no mes atual" title="Despesa mensal" value={currencyFormatter.format(monthlyExpense)} />
  </section>
);
