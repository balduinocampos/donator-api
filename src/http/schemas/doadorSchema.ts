import { validations } from "@/lib/zod";
import { TipoSanguineo, StatusDoador } from '@/domain/enums';

export const CreateDoadorSchema = validations.object({
  nome_completo: validations.string().min(3),
  telefone: validations.string().min(9),
  email: validations.string().email().optional().nullable(),
  senha: validations.string().min(6).optional(),
  tipo_sanguineo: validations.nativeEnum(TipoSanguineo),
  id_municipio: validations.number().int().positive(),
  data_nascimento: validations.string().transform((str) => new Date(str)).optional().nullable(),
  consentimento_sms: validations.boolean().optional()
});

export const UpdateDoadorSchema = validations.object({
  nome_completo: validations.string().optional(),
  telefone: validations.string().optional(),
  tipo_sanguineo: validations.nativeEnum(TipoSanguineo).optional(),
  id_municipio: validations.number().int().positive().optional(),
  status: validations.nativeEnum(StatusDoador).optional(),
});
