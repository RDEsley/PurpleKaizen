"use client";

import { useActionState, useEffect, useRef } from "react";

import { createContactAction } from "@/features/contacts/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Input } from "@/components/ui/input";
import { Table, TBody, THead } from "@/components/ui/table";

type Contact = {
  id: string;
  name: string;
  position: string | null;
  email: string | null;
  phone: string | null;
  is_primary: boolean;
  clients: { name: string } | null;
};

type ClientOption = {
  id: string;
  name: string;
};

type ContactsModuleProps = {
  contacts: Contact[];
  clients: ClientOption[];
};

const fieldError = (errors: Record<string, string[]> | undefined, name: string) => errors?.[name]?.[0];

export const ContactsModule = ({ contacts, clients }: ContactsModuleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createContactAction, initialFormState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Novo contato</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-3" ref={formRef}>
            <div>
              <select
                className={`h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm ${fieldError(state.fieldErrors, "client_id") ? "form-control-error" : ""}`}
                name="client_id"
                required
              >
                <option value="">Selecione o cliente</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {fieldError(state.fieldErrors, "client_id") ? <p className="form-field-error">{fieldError(state.fieldErrors, "client_id")}</p> : null}
            </div>
            <div>
              <Input
                className={fieldError(state.fieldErrors, "name") ? "form-control-error" : undefined}
                name="name"
                placeholder="Nome do contato"
                required
              />
              {fieldError(state.fieldErrors, "name") ? <p className="form-field-error">{fieldError(state.fieldErrors, "name")}</p> : null}
            </div>
            <Input name="position" placeholder="Cargo" />
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
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input name="is_primary" type="checkbox" />
              Contato principal
            </label>
            <FormFeedback state={state} />
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? "Salvando..." : "Salvar contato"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contatos por cliente</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <THead>
              <tr>
                <th>Nome</th>
                <th>Cliente</th>
                <th>Cargo</th>
                <th>Contato</th>
                <th>Tipo</th>
              </tr>
            </THead>
            <TBody>
              {contacts.length === 0 ? (
                <tr>
                  <td className="text-center text-slate-500" colSpan={5}>
                    Nenhum contato encontrado para o filtro informado.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td className="font-medium text-slate-800">{contact.name}</td>
                    <td>{contact.clients?.name ?? "-"}</td>
                    <td>{contact.position || "-"}</td>
                    <td>
                      <p>{contact.email || "-"}</p>
                      <p className="text-xs text-slate-500">{contact.phone || "-"}</p>
                    </td>
                    <td>{contact.is_primary ? "Principal" : "Secundario"}</td>
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
