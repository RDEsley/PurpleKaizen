"use client";

import { useActionState, useEffect, useRef } from "react";

import { createFinancialEntryAction } from "@/features/financial/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TBody, THead } from "@/components/ui/table";
import { currencyFormatter } from "@/lib/utils";

type FinancialEntry = {
  id: string;
  entry_type: "income" | "expense";
  category: string | null;
  description: string | null;
  amount: number;
  occurred_on: string;
  clients: { name: string } | null;
};

type ClientOption = {
  id: string;
  name: string;
};

type FinancialModuleProps = {
  entries: FinancialEntry[];
  clients: ClientOption[];
};

const fieldError = (errors: Record<string, string[]> | undefined, name: string) => errors?.[name]?.[0];

export const FinancialModule = ({ entries, clients }: FinancialModuleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createFinancialEntryAction, initialFormState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Novo lancamento</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-3" ref={formRef}>
            <select className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm" name="client_id">
              <option value="">Sem cliente vinculado</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
            <Select defaultValue="income" name="entry_type">
              <option value="income">Receita</option>
              <option value="expense">Custo</option>
            </Select>
            <Input name="category" placeholder="Categoria" />
            <Input name="description" placeholder="Descricao" />
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
            <div>
              <Input
                className={fieldError(state.fieldErrors, "occurred_on") ? "form-control-error" : undefined}
                name="occurred_on"
                type="date"
                required
              />
              {fieldError(state.fieldErrors, "occurred_on") ? <p className="form-field-error">{fieldError(state.fieldErrors, "occurred_on")}</p> : null}
            </div>
            <FormFeedback state={state} />
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? "Salvando..." : "Salvar lancamento"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fluxo financeiro</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <THead>
              <tr>
                <th>Data</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Categoria</th>
                <th>Valor</th>
              </tr>
            </THead>
            <TBody>
              {entries.length === 0 ? (
                <tr>
                  <td className="text-center text-slate-500" colSpan={5}>
                    Nenhum lancamento encontrado para o termo pesquisado.
                  </td>
                </tr>
              ) : (
                entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{new Date(entry.occurred_on).toLocaleDateString("pt-BR")}</td>
                    <td>{entry.clients?.name || "-"}</td>
                    <td className={entry.entry_type === "income" ? "text-emerald-700" : "text-red-600"}>
                      {entry.entry_type === "income" ? "Receita" : "Custo"}
                    </td>
                    <td>
                      <p>{entry.category || "-"}</p>
                      <p className="text-xs text-slate-500">{entry.description || "-"}</p>
                    </td>
                    <td>{currencyFormatter.format(Number(entry.amount))}</td>
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
