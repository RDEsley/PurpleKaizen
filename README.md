<div align="center">

<img src="https://img.shields.io/badge/status-active-8b5cf6?style=for-the-badge&labelColor=1a1a2e" />
<img src="https://img.shields.io/badge/Next.js-15-8b5cf6?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=1a1a2e" />
<img src="https://img.shields.io/badge/TypeScript-strict-8b5cf6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1a2e" />
<img src="https://img.shields.io/badge/Supabase-RLS-8b5cf6?style=for-the-badge&logo=supabase&logoColor=white&labelColor=1a1a2e" />

<br/><br/>

# ✦ PurpleKaizen CRM

**CRM fullstack moderno — do pipeline comercial à trilha de auditoria.**  
Construído com arquitetura orientada a features, segurança por design e UX executiva.

[**→ Acessar Demo ao Vivo**](https://purple-kaizen.vercel.app/)

<br/>

![Preview do PurpleKaizen CRM](https://github.com/user-attachments/assets/480937b9-ee56-4307-980a-f385d6949c25)

</div>

---

## Visão Geral

O **PurpleKaizen CRM** é uma plataforma completa de gestão comercial construída para demonstrar maturidade fullstack em ambiente de produção real. O projeto cobre o ciclo completo de uma operação comercial: da captação do lead ao fechamento da proposta, com controle financeiro e rastreabilidade total.

**Principais entregas do produto:**

| Módulo | Descrição |
|---|---|
| 🔐 **Autenticação** | Login seguro com proteção de rotas via middleware |
| 📊 **Dashboard Executivo** | KPIs em tempo real com visão consolidada |
| 👥 **Clientes & Contatos** | Gestão completa do relacionamento comercial |
| ✅ **Tarefas** | Pipeline de atividades por cliente |
| 📄 **Propostas** | Criação e acompanhamento de propostas comerciais |
| 💰 **Financeiro** | Controle de entradas e saídas por cliente |
| 🔍 **Auditoria** | Trilha de rastreabilidade para operações críticas |

---

## Stack Tecnológica

```
Frontend          Next.js 15 (App Router) + TypeScript estrito
Estilização       Tailwind CSS + CVA (Class Variance Authority) + Lucide Icons
Backend           Supabase — Auth · Postgres · Row Level Security
Validação         Zod (schemas em todas as camadas)
Deploy            Vercel
```

---

## Arquitetura

O projeto é organizado por **features**, separando domínio, UI e acesso a dados em camadas coesas e independentes.

```
├── app/
│   ├── (app)/                    # Rotas protegidas pelo middleware
│   │   ├── dashboard/
│   │   ├── clientes/
│   │   ├── contatos/
│   │   ├── tarefas/
│   │   ├── propostas/
│   │   ├── financeiro/
│   │   ├── auditoria/
│   │   └── analytics/
│   └── login/
│
├── components/
│   ├── layout/                   # Shell, sidebar, headers
│   ├── modules/                  # Componentes por domínio
│   └── ui/                       # Design system base
│
├── features/                     # Lógica de domínio por feature
│   ├── auth/
│   ├── clients/
│   ├── contacts/
│   ├── tasks/
│   ├── proposals/
│   ├── financial/
│   ├── dashboard/
│   └── audit/
│
├── lib/
│   └── supabase/                 # Clientes server/client e helpers
│
└── supabase/
    └── migrations/               # Schema versionado
```

---

## Modelo de Dados

O schema está inteiramente versionado em `supabase/migrations/20260420090000_init_crm.sql`.

**Tabelas principais:**

- `profiles` — usuários com papel `admin` ou `member`
- `clients` — base de clientes
- `contacts` — contatos vinculados a clientes
- `tasks` — tarefas por cliente
- `proposals` — propostas comerciais com status
- `financial_entries` — movimentações financeiras
- `audits` — log imutável de operações

**O que a migration entrega:**

- Tipos de domínio como enums (status, roles)
- Constraints, índices e trigger para `updated_at`
- RLS habilitado em todas as tabelas expostas
- Policies baseadas em `owner_id = auth.uid()`
- View `dashboard_metrics` com `security_invoker = true`

---

## Segurança

A segurança não é uma camada adicional — é parte do design desde o schema.

- **Row Level Security** habilitado em todas as tabelas de negócio
- **Nenhum uso de `service_role`** no cliente frontend
- **Middleware de autenticação** protege todas as rotas privadas
- **Auditoria automática** registra criações nos módulos principais
- **Schemas Zod** validam entradas antes de qualquer operação

---

## Rodando Localmente

### 1. Clonar e instalar

```bash
git clone https://github.com/seu-usuario/purple-kaizen.git
cd purple-kaizen
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Aplicar o schema no Supabase

Execute o arquivo de migration no **SQL Editor** do seu projeto Supabase:

```
supabase/migrations/20260420090000_init_crm.sql
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Sobe o build gerado |
| `npm run lint` | Análise estática com ESLint |
| `npm run typecheck` | Validação completa de tipos TypeScript |

---

## Roadmap

Melhorias planejadas para próximas versões:

- [ ] Testes unitários e E2E (Vitest + Playwright)
- [ ] Upload de arquivos e documentos por cliente
- [ ] Notificações em tempo real e automações
- [ ] Multi-tenant com isolamento por organização/equipe
- [ ] Gráficos avançados com séries temporais

---

## Pitch Técnico

> Para apresentações e entrevistas — roteiro sugerido de 2 a 4 minutos.

1. **Problema e proposta** — "Construí um CRM realista para gestão comercial com fluxo ponta a ponta, do lead ao fechamento."
2. **Arquitetura** — "Organizei por features para separar domínio, UI e acesso a dados, facilitando escalabilidade e manutenção."
3. **Segurança** — "Modelei RLS no Supabase para isolamento por usuário, sem nenhuma dependência de `service_role` no cliente."
4. **Qualidade de engenharia** — "TypeScript estrito, schemas Zod em todas as camadas, componentes reutilizáveis com CVA."
5. **Valor de produto** — "Dashboard executivo, pipeline comercial e trilha de auditoria entregam visão e governança para operações reais."

---

<div align="center">

Desenvolvido com foco em **maturidade fullstack**, **qualidade de produto** e **boas práticas de engenharia**.

</div>
