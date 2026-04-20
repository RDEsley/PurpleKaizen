import { createSupabaseServerClient } from "@/lib/supabase/server";

export const listClientOptions = async (): Promise<Array<{ id: string; name: string }>> => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("clients").select("id, name").order("name", { ascending: true }).limit(200);
  return data ?? [];
};
