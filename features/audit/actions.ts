"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Json } from "@/lib/supabase/types";

type RegisterAuditInput = {
  entity: string;
  entityId?: string | null;
  action: string;
  payload: Json;
};

export const registerAudit = async ({ entity, entityId, action, payload }: RegisterAuditInput) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("audits").insert({
    owner_id: user.id,
    entity,
    entity_id: entityId ?? null,
    action,
    payload
  });
};
