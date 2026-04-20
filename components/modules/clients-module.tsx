"use client";

import { useActionState, useEffect, useRef } from "react";

import { createClientAction } from "@/features/clients/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TBody, THead } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type Client = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  status: "lead" | "active" | "inactive";
  tags: string[];
  created_at: string;
};

type ClientsModuleProps = {
  clients: Client[];
};

const fieldError = (errors: Record<string, string[]> | undefined, name: string) => errors?.[name]?.[0];

export const ClientsModule = ({ clients }: ClientsModuleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createClientAction, initialFormState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Novo cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-3" ref={formRef}>
            <div>
              <Input
                className={fieldError(state.fieldErrors, "name") ? "form-control-error" : undefined}
                name="name"
                placeholder="Nome"
                required
              />
              {fieldError(state.fieldErrors, "name") ? <p className="form-field-error">{fieldError(state.fieldErrors, "name")}</p> : null}
            </div>
            <div>
              <Input name="company" placeholder="Empresa" />
            </div>
            <div>
              <Input
                className={fieldError(state.fieldErrors, "email") ? "form-control-error" : undefined}
                name="email"
                placeholder="E-mail"
                type="email"
              />
              {fieldError(state.fieldErrors, "email") ? <p className="form-field-error">{fieldError(state.fieldErrors, "email")}</p> : null}
            </div>
            <Input name="phone" placeholder="Telefone" />
            <div>
              <Select
                className={fieldError(state.fieldErrors, "status") ? "form-control-error" : undefined}
                defaultValue="lead"
                name="status"
              >
                <option value="lead">Lead</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </Select>
              {fieldError(state.fieldErrors, "status") ? <p className="form-field-error">{fieldError(state.fieldErrors, "status")}</p> : null}
            </div>
            <Input name="tags" placeholder="Tags separadas por virgula" />
            <Textarea name="notes" placeholder="Observacoes internas" />
            <FormFeedback state={state} />
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? "Salvando..." : "Salvar cliente"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clientes cadastrados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <THead>
              <tr>
                <th>Cliente</th>
                <th>Status</th>
                <th>Contato</th>
                <th>Tags</th>
                <th>Criado em</th>
              </tr>
            </THead>
            <TBody>
              {clients.length === 0 ? (
                <tr>
                  <td className="text-center text-slate-500" colSpan={5}>
                    Nenhum cliente encontrado. Tente outro termo na busca ou crie um novo registro.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <p className="font-medium text-slate-800">{client.name}</p>
                      <p className="text-xs text-slate-500">{client.company || "Sem empresa"}</p>
                    </td>
                    <td>
                      <Badge tone={client.status}>{client.status}</Badge>
                    </td>
                    <td>
                      <p>{client.email || "-"}</p>
                      <p className="text-xs text-slate-500">{client.phone || "-"}</p>
                    </td>
                    <td className="max-w-48 truncate text-xs text-slate-500">
                      {client.tags.length > 0 ? client.tags.join(", ") : "-"}
                    </td>
                    <td>{new Date(client.created_at).toLocaleDateString("pt-BR")}</td>
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
