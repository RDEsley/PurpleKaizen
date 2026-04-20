import { ClientsModule } from "@/components/modules/clients-module";
import { listClients } from "@/features/clients/actions";

type ClientesPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

const ClientesPage = async ({ searchParams }: ClientesPageProps) => {
  const query = (await searchParams)?.q;
  const clients = await listClients(query);
  return <ClientsModule clients={clients} />;
};

export default ClientesPage;
