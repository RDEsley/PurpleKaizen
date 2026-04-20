import { TasksModule } from "@/components/modules/tasks-module";
import { listClientOptions } from "@/features/clients/queries";
import { listTasks } from "@/features/tasks/actions";

type TarefasPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

const TarefasPage = async ({ searchParams }: TarefasPageProps) => {
  const query = (await searchParams)?.q;
  const [tasks, clients] = await Promise.all([listTasks(query), listClientOptions()]);
  return <TasksModule clients={clients} tasks={tasks} />;
};

export default TarefasPage;
