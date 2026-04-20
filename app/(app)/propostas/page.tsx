import { ProposalsModule } from "@/components/modules/proposals-module";
import { listClientOptions } from "@/features/clients/queries";
import { listProposals } from "@/features/proposals/actions";

type PropostasPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

const PropostasPage = async ({ searchParams }: PropostasPageProps) => {
  const query = (await searchParams)?.q;
  const [proposals, clients] = await Promise.all([listProposals(query), listClientOptions()]);
  return <ProposalsModule clients={clients} proposals={proposals} />;
};

export default PropostasPage;
