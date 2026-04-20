import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BriefcaseBusiness,
  ClipboardList,
  Contact2,
  LayoutDashboard,
  Landmark,
  ReceiptText,
  ShieldCheck
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const appNavigation: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: BriefcaseBusiness },
  { href: "/contatos", label: "Contatos", icon: Contact2 },
  { href: "/tarefas", label: "Tarefas", icon: ClipboardList },
  { href: "/propostas", label: "Propostas", icon: ReceiptText },
  { href: "/financeiro", label: "Financeiro", icon: Landmark },
  { href: "/auditoria", label: "Auditoria", icon: ShieldCheck },
  { href: "/analytics", label: "Analytics", icon: BarChart3 }
];
