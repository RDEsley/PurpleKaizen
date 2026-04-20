import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(3, "Informe o nome do cliente."),
  company: z.string().optional(),
  email: z.string().email("E-mail invalido.").optional().or(z.literal("")),
  phone: z.string().optional(),
  status: z.enum(["lead", "active", "inactive"]),
  tags: z.string().optional(),
  notes: z.string().optional()
});

export const contactSchema = z.object({
  client_id: z.string().uuid("Selecione um cliente."),
  name: z.string().min(3, "Nome obrigatorio."),
  position: z.string().optional(),
  email: z.string().email("E-mail invalido.").optional().or(z.literal("")),
  phone: z.string().optional(),
  is_primary: z.boolean().optional()
});

export const taskSchema = z.object({
  title: z.string().min(3, "Titulo obrigatorio."),
  description: z.string().optional(),
  client_id: z.string().uuid().optional().or(z.literal("")),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.string().optional(),
  status: z.enum(["pending", "done", "cancelled"])
});

export const proposalSchema = z.object({
  client_id: z.string().uuid("Selecione um cliente."),
  title: z.string().min(3, "Titulo obrigatorio."),
  amount: z.coerce.number().min(1, "Valor deve ser maior que zero."),
  status: z.enum(["draft", "sent", "approved", "rejected"]),
  valid_until: z.string().optional(),
  details: z.string().optional()
});

export const financialEntrySchema = z.object({
  client_id: z.string().uuid().optional().or(z.literal("")),
  entry_type: z.enum(["income", "expense"]),
  category: z.string().optional(),
  description: z.string().optional(),
  amount: z.coerce.number().min(1, "Valor invalido."),
  occurred_on: z.string().min(1, "Informe a data.")
});
