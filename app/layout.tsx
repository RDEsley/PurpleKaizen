import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "PurpleKaizen CRM",
  description: "Sistema completo de gestao de clientes com Supabase."
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="pt-BR">
    <body>{children}</body>
  </html>
);

export default RootLayout;
