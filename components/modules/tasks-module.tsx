"use client";

import { useActionState, useEffect, useRef } from "react";

import { createTaskAction } from "@/features/tasks/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TBody, THead } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Task = {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "pending" | "done" | "cancelled";
  due_date: string | null;
  clients: { name: string } | null;
};

type ClientOption = {
  id: string;
  name: string;
};

type TasksModuleProps = {
  tasks: Task[];
  clients: ClientOption[];
};

const fieldError = (errors: Record<string, string[]> | undefined, name: string) => errors?.[name]?.[0];

export const TasksModule = ({ tasks, clients }: TasksModuleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createTaskAction, initialFormState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Nova tarefa</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-3" ref={formRef}>
            <div>
              <Input
                className={fieldError(state.fieldErrors, "title") ? "form-control-error" : undefined}
                name="title"
                placeholder="Titulo da tarefa"
                required
              />
              {fieldError(state.fieldErrors, "title") ? <p className="form-field-error">{fieldError(state.fieldErrors, "title")}</p> : null}
            </div>
            <Textarea name="description" placeholder="Descricao" />
            <div>
              <select className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm" name="client_id">
                <option value="">Sem cliente vinculado</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <Select
              className={fieldError(state.fieldErrors, "priority") ? "form-control-error" : undefined}
              defaultValue="medium"
              name="priority"
            >
              <option value="low">Baixa</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </Select>
            <Select
              className={fieldError(state.fieldErrors, "status") ? "form-control-error" : undefined}
              defaultValue="pending"
              name="status"
            >
              <option value="pending">Pendente</option>
              <option value="done">Concluida</option>
              <option value="cancelled">Cancelada</option>
            </Select>
            <Input name="due_date" type="date" />
            <FormFeedback state={state} />
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? "Salvando..." : "Salvar tarefa"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Follow-ups e atividades</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <THead>
              <tr>
                <th>Tarefa</th>
                <th>Cliente</th>
                <th>Prioridade</th>
                <th>Status</th>
                <th>Vencimento</th>
              </tr>
            </THead>
            <TBody>
              {tasks.length === 0 ? (
                <tr>
                  <td className="text-center text-slate-500" colSpan={5}>
                    Nenhuma tarefa encontrada para o filtro aplicado.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <p className="font-medium text-slate-800">{task.title}</p>
                      <p className="text-xs text-slate-500">{task.description || "Sem descricao"}</p>
                    </td>
                    <td>{task.clients?.name || "-"}</td>
                    <td className="capitalize">{task.priority}</td>
                    <td>
                      <Badge tone={task.status}>{task.status}</Badge>
                    </td>
                    <td>{task.due_date ? new Date(task.due_date).toLocaleDateString("pt-BR") : "-"}</td>
                  </tr>
                ))
              )}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
