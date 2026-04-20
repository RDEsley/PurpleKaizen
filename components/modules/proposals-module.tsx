"use client";

import { useActionState, useEffect, useRef } from "react";

import { createProposalAction } from "@/features/proposals/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TBody, THead } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { currencyFormatter } from "@/lib/utils";

type Proposal = {
  id: string;
  title: string;
  amount: number;
  status: "draft" | "sent" | "approved" | "rejected";
  valid_until: string | null;
  clients: { name: string } | null;
};

type ClientOption = {
  id: string;
  name: string;
};

type ProposalsModuleProps = {
  proposals: Proposal[];
  clients: ClientOption[];
};

const fieldError = (errors: Record<string, string[]> | undefined, name: string) => errors?.[name]?.[0];

export const ProposalsModule = ({ proposals, clients }: ProposalsModuleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createProposalAction, initialFormState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Nova proposta</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-3" ref={formRef}>
            <div>
              <select
                className={`h-10 w-full rounded-xl border border-slate-200 px-3 text-sm ${fieldError(state.fieldErrors, "client_id") ? "form-control-error" : ""}`}
                name="client_id"
                required
              >
                <option value="">Cliente da proposta</option>
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
                className={fieldError(state.fieldErrors, "title") ? "form-control-error" : undefined}
                name="title"
                placeholder="Titulo da proposta"
                required
              />
              {fieldError(state.fieldErrors, "title") ? <p className="form-field-error">{fieldError(state.fieldErrors, "title")}</p> : null}
            </div>
            <div>
              <Input
                className={fieldError(state.fieldErrors, "amount") ? "form-control-error" : undefined}
                min={1}
                name="amount"
                placeholder="Valor"
                step="0.01"
                type="number"
                required
              />
              {fieldError(state.fieldErrors, "amount") ? <p className="form-field-error">{fieldError(state.fieldErrors, "amount")}</p> : null}
            </div>
            <Select defaultValue="draft" name="status">
              <option value="draft">Rascunho</option>
              <option value="sent">Enviada</option>
              <option value="approved">Aprovada</option>
              <option value="rejected">Rejeitada</option>
            </Select>
            <Input name="valid_until" type="date" />
            <Textarea name="details" placeholder="Detalhes comerciais" />
            <FormFeedback state={state} />
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? "Salvando..." : "Salvar proposta"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline de propostas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <THead>
              <tr>
                <th>Proposta</th>
                <th>Cliente</th>
                <th>Status</th>
                <th>Validade</th>
                <th>Valor</th>
              </tr>
            </THead>
            <TBody>
              {proposals.length === 0 ? (
                <tr>
                  <td className="text-center text-slate-500" colSpan={5}>
                    Nenhuma proposta encontrada para o filtro atual.
                  </td>
                </tr>
              ) : (
                proposals.map((proposal) => (
                  <tr key={proposal.id}>
                    <td className="font-medium text-slate-800">{proposal.title}</td>
                    <td>{proposal.clients?.name || "-"}</td>
                    <td>
                      <Badge tone={proposal.status === "approved" ? "done" : proposal.status === "rejected" ? "cancelled" : "pending"}>
                        {proposal.status}
                      </Badge>
                    </td>
                    <td>{proposal.valid_until ? new Date(proposal.valid_until).toLocaleDateString("pt-BR") : "-"}</td>
                    <td>{currencyFormatter.format(Number(proposal.amount))}</td>
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
