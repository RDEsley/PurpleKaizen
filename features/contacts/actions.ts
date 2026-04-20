"use server";

import { revalidatePath } from "next/cache";

import { registerAudit } from "@/features/audit/actions";
import { contactSchema } from "@/features/schemas";
import type { FormState } from "@/features/shared/form-state";
import { formBoolean, formValue } from "@/features/shared/form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type ContactRow = Database["public"]["Tables"]["contacts"]["Row"] & {
  clients: { name: string } | null;
};

export const listContacts = async (query?: string): Promise<ContactRow[]> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("contacts")
    .select("*, clients(name)")
    .order("created_at", { ascending: false })
    .limit(30);

  const normalizedQuery = query?.trim().toLowerCase();

  const rows = (data ?? []) as ContactRow[];

  if (!normalizedQuery) {
    return rows;
  }

  return rows.filter((contact) =>
    [contact.name, contact.position, contact.email, contact.phone, contact.clients?.name]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery))
  );
};

export const createContactAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const parsed = contactSchema.safeParse({
    client_id: formValue(formData, "client_id"),
    name: formValue(formData, "name"),
    position: formValue(formData, "position"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    is_primary: formBoolean(formData, "is_primary")
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Revise os campos do contato antes de salvar.",
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
    name: parsed.data.name,
    position: parsed.data.position || null,
    email: parsed.data.email || null,
    phone: parsed.data.phone || null,
    is_primary: Boolean(parsed.data.is_primary)
  };

  const { data, error } = await supabase.from("contacts").insert(payload).select("id").single();

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  await registerAudit({
    entity: "contacts",
    entityId: data.id,
    action: "create",
    payload
  });

  revalidatePath("/contatos");

  return {
    success: true,
    message: "Contato salvo com sucesso."
  };
};
