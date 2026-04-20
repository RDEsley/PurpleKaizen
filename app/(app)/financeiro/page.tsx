import { FinancialModule } from "@/components/modules/financial-module";
import { listClientOptions } from "@/features/clients/queries";
import { listFinancialEntries } from "@/features/financial/actions";

type FinanceiroPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

const FinanceiroPage = async ({ searchParams }: FinanceiroPageProps) => {
  const query = (await searchParams)?.q;
  const [entries, clients] = await Promise.all([listFinancialEntries(query), listClientOptions()]);
  return <FinancialModule clients={clients} entries={entries} />;
};

export default FinanceiroPage;
