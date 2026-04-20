import { DashboardMetrics } from "@/components/modules/dashboard-metrics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardMetrics } from "@/features/dashboard/queries";

const DashboardPage = async () => {
  const metrics = await getDashboardMetrics();

  return (
    <div className="space-y-6">
      <DashboardMetrics {...metrics} />

      <Card>
        <CardHeader>
          <CardTitle>Resumo estrategico</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600">
          <p>
            Dados centralizados, rotas protegidas, arquitetura por features, seguranca com RLS e rastreabilidade de
            alteracoes para uma operacao comercial mais eficiente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
