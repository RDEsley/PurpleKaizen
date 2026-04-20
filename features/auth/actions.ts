"use server";

import { redirect } from "next/navigation";

import type { FormState } from "@/features/shared/form-state";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const readString = (value: FormDataEntryValue | null) => (typeof value === "string" ? value.trim() : "");

export const signInAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
  const email = readString(formData.get("email"));
  const password = readString(formData.get("password"));

  if (!email || !password) {
    return {
      success: false,
      message: "Informe e-mail e senha para continuar."
    };
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      success: false,
      message: error.message
    };
  }

  redirect("/dashboard");
};

export const signOutAction = async () => {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
};
