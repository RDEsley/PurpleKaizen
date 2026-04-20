import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProps) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="page-shell">
      <AppSidebar />
      <main className="content-shell">
        <AppHeader userEmail={user.email} />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
