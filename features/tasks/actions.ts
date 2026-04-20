"use server";

import { revalidatePath } from "next/cache";

import { registerAudit } from "@/features/audit/actions";
import { taskSchema } from "@/features/schemas";
import type { FormState } from "@/features/shared/form-state";
import { formValue } from "@/features/shared/form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type TaskRow = Database["public"]["Tables"]["tasks"]["Row"] & {
  clients: { name: string } | null;
};

export const listTasks = async (query?: string): Promise<TaskRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("tasks")
    .select("*, clients(name)")
    .order("created_at", { ascending: false })
    .limit(30);

  const normalizedQuery = query?.trim().toLowerCase();

  const rows = (data ?? []) as TaskRow[];

  if (!normalizedQuery) {
    return rows;
  }

  return rows.filter((task) =>
    [task.title, task.description, task.priority, task.status, task.clients?.name]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery))
  );
};

export const createTaskAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const parsed = taskSchema.safeParse({
    title: formValue(formData, "title"),
    description: formValue(formData, "description"),
    client_id: formValue(formData, "client_id"),
    priority: formValue(formData, "priority"),
    due_date: formValue(formData, "due_date"),
    status: formValue(formData, "status")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Corrija os campos da tarefa para continuar.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Sessao expirada. Faca login novamente."
    };
  }

  const payload = {
    owner_id: user.id,
    title: parsed.data.title,
    description: parsed.data.description || null,
    client_id: parsed.data.client_id || null,
    priority: parsed.data.priority,
    due_date: parsed.data.due_date || null,
    status: parsed.data.status
  };

  const { data, error } = await supabase.from("tasks").insert(payload).select("id").single();

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  await registerAudit({
    entity: "tasks",
    entityId: data.id,
    action: "create",
    payload
  });

  revalidatePath("/tarefas");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Tarefa criada com sucesso."
  };
};
