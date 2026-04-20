"use client";

import { useActionState } from "react";
import { ArrowRight, ChartNoAxesCombined, LockKeyhole, Shield } from "lucide-react";

import { signInAction } from "@/features/auth/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [state, formAction, pending] = useActionState(signInAction, initialFormState);

  return (
    <main className="grid min-h-dvh place-items-center bg-slate-100 p-3 sm:p-4 md:p-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 sm:gap-6 lg:grid-cols-[1fr_480px]">
        <section className="hidden h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-subtle lg:flex lg:flex-col lg:justify-between xl:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">PurpleKaizen CRM</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-slate-900 xl:text-5xl">
              Gestão comercial inteligente para equipes de alta performance.
            </h1>
            <p className="mt-4 max-w-lg text-base text-slate-600">
              Centralize clientes, tarefas, propostas e visão financeira em uma única plataforma com segurança e
              produtividade.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Shield className="h-5 w-5 text-brand" />
              <p className="mt-2 text-sm font-semibold text-slate-900">Acesso protegido</p>
              <p className="mt-1 text-xs text-slate-500">Sessão segura com autenticação e controle por usuário.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <ChartNoAxesCombined className="h-5 w-5 text-brand" />
              <p className="mt-2 text-sm font-semibold text-slate-900">Visão consolidada</p>
              <p className="mt-1 text-xs text-slate-500">Dados comerciais e financeiros organizados em tempo real.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="mb-3 hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle sm:mb-4 sm:block lg:hidden">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">PurpleKaizen CRM</p>
            <p className="mt-1 text-sm font-medium text-slate-900">Gestão comercial inteligente</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">Acesse sua conta para continuar.</p>
          </div>

          <Card className="border-slate-200 bg-white shadow-subtle">
            <CardHeader className="space-y-4 p-6 sm:space-y-5 sm:p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Área restrita</p>
                <CardTitle className="mt-2 text-2xl leading-tight text-slate-900 sm:text-3xl">Acessar conta</CardTitle>
              </div>
              <p className="text-sm leading-relaxed text-slate-500">
                Informe suas credenciais para continuar.
              </p>
            </CardHeader>
            <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
              <br />
              <form action={formAction} className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-sm font-medium text-slate-700" htmlFor="email">
                    E-mail corporativo
                  </label>
                  <Input id="email" name="email" placeholder="nome@empresa.com" type="email" required />
                  <p className="text-xs leading-relaxed text-slate-500">
                    Teste: <span className="font-medium text-slate-600">teste@gmail.com</span>
                  </p>
                </div>

                <div className="space-y-2.5">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Senha
                  </label>
                  <Input id="password" name="password" placeholder="Digite sua senha" type="password" required />
                  <p className="text-xs leading-relaxed text-slate-500">
                    Teste: <span className="font-medium text-slate-600">123456</span>
                  </p>
                </div>

                <FormFeedback state={state} />

                <div className="pt-1">
                  <Button className="group w-full" disabled={pending} size="lg" type="submit">
                    {pending ? "Entrando..." : "Entrar"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Ao continuar, você confirma que tem permissão para acessar este ambiente.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default LoginPage;
