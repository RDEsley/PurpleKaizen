import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

import type { Database } from "@/lib/supabase/types";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const updateSession = async (request: NextRequest) => {
  const response = NextResponse.next({ request });
  const { url, key } = getSupabaseConfig();

  const supabase = createServerClient<Database>(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        request.cookies.set({ name, value, ...(options as object) });
        response.cookies.set({ name, value, ...(options as object) });
      },
      remove(name: string, options: Record<string, unknown>) {
        request.cookies.set({ name, value: "", ...(options as object) });
        response.cookies.set({ name, value: "", ...(options as object), maxAge: 0 });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith("/login")) {
    const urlLogin = request.nextUrl.clone();
    urlLogin.pathname = "/login";
    return NextResponse.redirect(urlLogin);
  }

  if (user && request.nextUrl.pathname.startsWith("/login")) {
    const urlDashboard = request.nextUrl.clone();
    urlDashboard.pathname = "/dashboard";
    return NextResponse.redirect(urlDashboard);
  }

  return response;
};
