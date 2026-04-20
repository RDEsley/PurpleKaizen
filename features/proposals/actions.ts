"use server";

import { revalidatePath } from "next/cache";

import { registerAudit } from "@/features/audit/actions";
import { proposalSchema } from "@/features/schemas";
import type { FormState } from "@/features/shared/form-state";
import { formValue } from "@/features/shared/form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type ProposalRow = Database["public"]["Tables"]["proposals"]["Row"] & {
  clients: { name: string } | null;
};

export const listProposals = async (query?: string): Promise<ProposalRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("proposals")
    .select("*, clients(name)")
    .order("created_at", { ascending: false })
    .limit(30);

  const normalizedQuery = query?.trim().toLowerCase();

  const rows = (data ?? []) as ProposalRow[];

  if (!normalizedQuery) {
    return rows;
  }

  return rows.filter((proposal) =>
    [proposal.title, proposal.status, proposal.clients?.name]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery))
  );
};

export const createProposalAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const parsed = proposalSchema.safeParse({
    client_id: formValue(formData, "client_id"),
    title: formValue(formData, "title"),
    amount: formValue(formData, "amount"),
    status: formValue(formData, "status"),
    valid_until: formValue(formData, "valid_until"),
    details: formValue(formData, "details")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Revise os dados da proposta antes de salvar.",
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
    client_id: parsed.data.client_id,
    title: parsed.data.title,
    amount: parsed.data.amount,
    status: parsed.data.status,
    valid_until: parsed.data.valid_until || null,
    details: parsed.data.details || null
  };

  const { data, error } = await supabase.from("proposals").insert(payload).select("id").single();

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  await registerAudit({
    entity: "proposals",
    entityId: data.id,
    action: "create",
    payload
  });

  revalidatePath("/propostas");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Proposta salva com sucesso."
  };
};
