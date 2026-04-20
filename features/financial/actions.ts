"use server";

import { revalidatePath } from "next/cache";

import { registerAudit } from "@/features/audit/actions";
import { financialEntrySchema } from "@/features/schemas";
import type { FormState } from "@/features/shared/form-state";
import { formValue } from "@/features/shared/form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type FinancialEntryRow = Database["public"]["Tables"]["financial_entries"]["Row"] & {
  clients: { name: string } | null;
};

export const listFinancialEntries = async (query?: string): Promise<FinancialEntryRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("financial_entries")
    .select("*, clients(name)")
    .order("occurred_on", { ascending: false })
    .limit(40);

  const normalizedQuery = query?.trim().toLowerCase();

  const rows = (data ?? []) as FinancialEntryRow[];

  if (!normalizedQuery) {
    return rows;
  }

  return rows.filter((entry) =>
    [entry.category, entry.description, entry.entry_type, entry.clients?.name]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery))
  );
};

export const createFinancialEntryAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const parsed = financialEntrySchema.safeParse({
    client_id: formValue(formData, "client_id"),
    entry_type: formValue(formData, "entry_type"),
    category: formValue(formData, "category"),
    description: formValue(formData, "description"),
    amount: formValue(formData, "amount"),
    occurred_on: formValue(formData, "occurred_on")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Corrija os campos do lancamento para continuar.",
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
    client_id: parsed.data.client_id || null,
    entry_type: parsed.data.entry_type,
    category: parsed.data.category || null,
    description: parsed.data.description || null,
    amount: parsed.data.amount,
    occurred_on: parsed.data.occurred_on
  };

  const { data, error } = await supabase.from("financial_entries").insert(payload).select("id").single();

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  await registerAudit({
    entity: "financial_entries",
    entityId: data.id,
    action: "create",
    payload
  });

  revalidatePath("/financeiro");
  revalidatePath("/dashboard");
  revalidatePath("/analytics");

  return {
    success: true,
    message: "Lancamento salvo com sucesso."
  };
};
