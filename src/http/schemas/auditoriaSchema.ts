import { validations } from "@/lib/zod";

export const CreateLogAcessoSchema = validations.object({
  id_hospital: validations.number().int().positive().optional(),
  id_doador: validations.number().int().positive().optional(),
  acao: validations.string().min(2),
  descricao: validations.string().min(2),
  ip_origem: validations.string()
});
