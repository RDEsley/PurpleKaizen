import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyFormatter } from "@/lib/utils";

type AnalyticsModuleProps = {
  monthlyIncome: number;
  monthlyExpense: number;
  activeClients: number;
  openProposals: number;
};

const ProgressBar = ({ value, max, tone }: { value: number; max: number; tone: "green" | "purple" }) => (
  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
    <div
      className={tone === "green" ? "h-full bg-emerald-500" : "h-full bg-brand"}
      style={{ width: `${Math.min((value / Math.max(max, 1)) * 100, 100)}%` }}
    />
  </div>
);

export const AnalyticsModule = ({
  monthlyIncome,
  monthlyExpense,
  activeClients,
  openProposals
}: AnalyticsModuleProps) => {
  const balance = monthlyIncome - monthlyExpense;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Saude financeira</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <p className="text-sm text-slate-500">Receitas</p>
            <p className="text-2xl font-semibold text-emerald-700">{currencyFormatter.format(monthlyIncome)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Custos</p>
            <p className="text-2xl font-semibold text-red-600">{currencyFormatter.format(monthlyExpense)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Saldo do mes</p>
            <p className="text-3xl font-semibold text-slate-900">{currencyFormatter.format(balance)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline comercial</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex justify-between text-sm text-slate-600">
              <span>Clientes ativos</span>
              <span>{activeClients}</span>
            </div>
            <ProgressBar max={Math.max(activeClients, openProposals, 10)} tone="green" value={activeClients} />
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm text-slate-600">
              <span>Propostas abertas</span>
              <span>{openProposals}</span>
            </div>
            <ProgressBar max={Math.max(activeClients, openProposals, 10)} tone="purple" value={openProposals} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
