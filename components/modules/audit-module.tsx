import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, THead } from "@/components/ui/table";

type AuditRecord = {
  id: number;
  entity: string;
  action: string;
  created_at: string;
  payload: unknown;
};

type AuditModuleProps = {
  audits: AuditRecord[];
};

export const AuditModule = ({ audits }: AuditModuleProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Historico de alteracoes</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <Table>
        <THead>
          <tr>
            <th>Data</th>
            <th>Modulo</th>
            <th>Acao</th>
            <th>Payload</th>
          </tr>
        </THead>
        <TBody>
          {audits.length === 0 ? (
            <tr>
              <td className="text-center text-slate-500" colSpan={4}>
                Nenhum evento auditado.
              </td>
            </tr>
          ) : (
            audits.map((record) => (
              <tr key={record.id}>
                <td>{new Date(record.created_at).toLocaleString("pt-BR")}</td>
                <td className="capitalize">{record.entity}</td>
                <td className="uppercase text-xs tracking-wide text-slate-500">{record.action}</td>
                <td className="max-w-96 truncate text-xs text-slate-500">{JSON.stringify(record.payload)}</td>
              </tr>
            ))
          )}
        </TBody>
      </Table>
    </CardContent>
  </Card>
);
