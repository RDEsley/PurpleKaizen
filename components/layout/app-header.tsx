"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LogOut, RefreshCw, Search } from "lucide-react";

import { signOutAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AppHeaderProps = {
  userEmail?: string;
};

export const AppHeader = ({ userEmail }: AppHeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  return (
    <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Painel de controle</h2>
        <p className="text-sm text-slate-500">{userEmail ? `Conectado como ${userEmail}` : "Sem sessao ativa"}</p>
      </div>

      <div className="flex w-full items-center gap-2 md:w-auto">
        <form action={pathname} className="relative w-full md:w-80" method="get">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input className="pl-9 pr-9" defaultValue={currentQuery} name="q" placeholder="Buscar nesta tela..." />
        </form>
        <Button onClick={() => router.refresh()} type="button" variant="secondary">
          <RefreshCw className="mr-2 h-4 w-4" />
          Recarregar
        </Button>
        <form action={signOutAction}>
          <Button type="submit" variant="secondary">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </form>
      </div>
    </header>
  );
};
