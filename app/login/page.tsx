"use client";

import { useActionState } from "react";

import { signInAction } from "@/features/auth/actions";
import { initialFormState } from "@/features/shared/form-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFeedback } from "@/components/ui/form-feedback";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const [state, formAction, pending] = useActionState(signInAction, initialFormState);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="text-xs uppercase tracking-[0.2em] text-brand">PurpleKaizen</p>
          <CardTitle className="text-2xl">Acesse seu CRM</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <Input name="email" placeholder="E-mail" type="email" required />
            <Input name="password" placeholder="Senha" type="password" required />
            <FormFeedback state={state} />
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-500">
            Use credenciais cadastradas no Supabase Auth. Este projeto foi pensado para portfolio profissional.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
