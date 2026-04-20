import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type DashboardMetrics = {
  activeClients: number;
  leads: number;
  pendingTasks: number;
  openProposals: number;
  monthlyIncome: number;
  monthlyExpense: number;
};

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  const supabase = await createSupabaseServerClient();

  const [{ count: activeClients }, { count: leads }, { count: pendingTasks }, { count: openProposals }] =
    await Promise.all([
      supabase.from("clients").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("clients").select("*", { count: "exact", head: true }).eq("status", "lead"),
      supabase.from("tasks").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase
        .from("proposals")
        .select("*", { count: "exact", head: true })
        .in("status", ["draft", "sent"])
    ]);

  const firstDay = new Date();
  firstDay.setDate(1);

  const { data: financialEntries } = await supabase
    .from("financial_entries")
    .select("entry_type, amount")
    .gte("occurred_on", firstDay.toISOString().slice(0, 10));

  const totals = (financialEntries ?? []).reduce(
    (acc, entry) => {
      if (entry.entry_type === "income") {
        acc.monthlyIncome += Number(entry.amount);
      } else {
        acc.monthlyExpense += Number(entry.amount);
      }
      return acc;
    },
    { monthlyIncome: 0, monthlyExpense: 0 }
  );

  return {
    activeClients: activeClients ?? 0,
    leads: leads ?? 0,
    pendingTasks: pendingTasks ?? 0,
    openProposals: openProposals ?? 0,
    monthlyIncome: totals.monthlyIncome,
    monthlyExpense: totals.monthlyExpense
  };
};

type AuditRow = Database["public"]["Tables"]["audits"]["Row"];

export const getAuditTrail = async (): Promise<AuditRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("audits").select("*").order("created_at", { ascending: false }).limit(50);
  return data ?? [];
};
