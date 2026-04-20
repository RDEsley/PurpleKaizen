# PurpleKaizen CRM

Sistema completo de gestao de clientes, construido com foco em:
- arquitetura escalavel;
- UX profissional;
- seguranca com Supabase RLS;
- clean code e organizacao por features.

## Preview do produto

Acesse pelo link: [https://purple-kaizen.vercel.app/](purple-kaizen)

<img width="1918" height="936" alt="image" src="https://github.com/user-attachments/assets/480937b9-ee56-4307-980a-f385d6949c25" />
<br>

O projeto entrega um CRM moderno com:

- autenticacao e protecao de rotas;
- dashboard executivo com KPIs;
- modulos de clientes, contatos, tarefas, propostas e financeiro;
- trilha de auditoria para operacoes criticas.

## Stack

- **Framework:** Next.js (App Router) + TypeScript
- **UI:** Tailwind CSS + CVA + Lucide
- **Backend:** Supabase (Auth + Postgres + RLS)
- **Validacao:** Zod

## Arquitetura de pastas

```text
app/
  (app)/
    dashboard/
    clientes/
    contatos/
    tarefas/
    propostas/
    financeiro/
    auditoria/
    analytics/
  login/
components/
  layout/
  modules/
  ui/
features/
  auth/
  clients/
  contacts/
  tasks/
  proposals/
  financial/
  dashboard/
  audit/
lib/
  supabase/
supabase/
  migrations/
```

## Modelo de dados (Supabase)

Tabelas principais:
- `profiles` (role: `admin` ou `member`);
- `clients`;
- `contacts`;
- `tasks`;
- `proposals`;
- `financial_entries`;
- `audits`.

Migration inicial:
- `supabase/migrations/20260420090000_init_crm.sql`

Ela inclui:
- tipos de dominio (status e enums);
- constraints e indices;
- trigger para `updated_at`;
- RLS habilitado em todas as tabelas expostas;
- policies por `owner_id = auth.uid()`;
- view `dashboard_metrics` com `security_invoker = true`.

## Seguranca

- Todas as tabelas de negocio usam RLS.
- Nada de `service_role` no frontend.
- Rotas privadas sao protegidas via middleware.
- Auditoria registra criacoes em todos os modulos principais.

## Setup local

### 1) Clonar e instalar dependencias

```bash
npm install
```

### 2) Configurar variaveis

Copie `.env.example` para `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 3) Aplicar schema no Supabase

Execute o SQL da migration inicial no SQL Editor do projeto Supabase:

`supabase/migrations/20260420090000_init_crm.sql`

### 4) Rodar projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` - ambiente de desenvolvimento
- `npm run build` - build de producao
- `npm run start` - sobe a build
- `npm run lint` - analise lint
- `npm run typecheck` - validacao de tipos

## Como apresentar o produto

Sugestao de pitch tecnico (2-4 minutos):

1. **Problema e proposta**  
   "Criei um CRM realista para gestao comercial com fluxo ponta a ponta."

2. **Arquitetura**  
   "Organizei por features para separar dominio, UI e acesso a dados."

3. **Seguranca**  
   "Modelei RLS no Supabase para isolamento por usuario e politicas explicitas."

4. **Qualidade de engenharia**  
   "Usei TypeScript estrito, schemas com Zod e padroes de componentes reutilizaveis."

5. **Valor de produto**  
   "Dashboard, pipeline e trilha de auditoria entregam visao executiva e governanca."

## Melhorias futuras

- testes unitarios e e2e;
- upload de arquivos por cliente;
- notificacoes e automacoes;
- multi-tenant por organizacao/equipe;
- graficos avancados com serie temporal.

---

Projeto desenvolvido com foco em maturidade fullstack, qualidade de produto e boas praticas de engenharia.
