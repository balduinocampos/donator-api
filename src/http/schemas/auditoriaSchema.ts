import { validations } from "@/lib/zod";

export const CreateLogAcessoSchema = validations.object({
  id_hospital: validations.number().int().positive().optional(),
  id_doador: validations.number().int().positive().optional(),
  acao: validations.string().min(2),
  descricao: validations.string().min(2),
  ip_origem: validations.string()
});

export const CreateSessaoSchema = validations.object({
  id_sessao: validations.string().uuid(),
  id_usuario: validations.number().int().positive(), // mapped to id_hospital or id_doador
  ip_origem: validations.string(),
  user_agent: validations.string().nullable().optional(),
  data_expiracao: validations.date()
});

export const idParam = validations.object({ id: validations.string().uuid() });

export const updateSessaoSchema = validations.object({
  id_usuario: validations.number().int().positive(), // mapped to id_hospital or id_doador
  ip_origem: validations.string(),
  user_agent: validations.string().nullable().optional(),
  data_expiracao: validations.date()
});
