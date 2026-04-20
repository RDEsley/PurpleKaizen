"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white p-4 lg:block">
      <div className="mb-8 rounded-2xl bg-brand px-4 py-5 text-brand-foreground">
        <p className="text-xs uppercase tracking-[0.2em]">PurpleKaizen</p>
        <h1 className="mt-1 text-xl font-semibold">CRM Portfolio</h1>
        <p className="mt-2 text-sm text-purple-100">Gestao moderna de clientes com Supabase.</p>
      </div>

      <nav className="space-y-1">
        {appNavigation.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                active ? "bg-brand/10 text-brand" : "text-slate-700 hover:bg-slate-100"
              )}
              href={item.href}
              key={item.href}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
