import { ContactsModule } from "@/components/modules/contacts-module";
import { listClientOptions } from "@/features/clients/queries";
import { listContacts } from "@/features/contacts/actions";

type ContatosPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

const ContatosPage = async ({ searchParams }: ContatosPageProps) => {
  const query = (await searchParams)?.q;
  const [contacts, clients] = await Promise.all([listContacts(query), listClientOptions()]);
  return <ContactsModule clients={clients} contacts={contacts} />;
};

export default ContatosPage;
