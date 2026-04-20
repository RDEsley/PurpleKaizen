"use server";

import { revalidatePath } from "next/cache";

import { registerAudit } from "@/features/audit/actions";
import { clientSchema } from "@/features/schemas";
import type { FormState } from "@/features/shared/form-state";
import { formValue } from "@/features/shared/form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type ClientRow = Database["public"]["Tables"]["clients"]["Row"];

export const listClients = async (query?: string): Promise<ClientRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    return [];
  }

  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return data ?? [];
  }

  return (data ?? []).filter((client) =>
    [client.name, client.company, client.email, client.phone, ...(client.tags ?? [])]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery))
  );
};

export const createClientAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const parsed = clientSchema.safeParse({
    name: formValue(formData, "name"),
    company: formValue(formData, "company"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    status: formValue(formData, "status"),
    tags: formValue(formData, "tags"),
    notes: formValue(formData, "notes")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Corrija os campos destacados para salvar o cliente.",
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
    name: parsed.data.name,
    company: parsed.data.company || null,
    email: parsed.data.email || null,
    phone: parsed.data.phone || null,
    status: parsed.data.status,
    tags: parsed.data.tags ? parsed.data.tags.split(",").map((tag) => tag.trim()) : [],
    notes: parsed.data.notes || null
  };

  const { data, error } = await supabase.from("clients").insert(payload).select("id").single();

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  await registerAudit({
    entity: "clients",
    entityId: data.id,
    action: "create",
    payload
  });

  revalidatePath("/clientes");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Cliente salvo com sucesso."
  };
};
