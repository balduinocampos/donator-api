import { validations } from "@/lib/zod";
import { StatusAgenda } from '@/domain/enums';

export const CreateAgendaSchema = validations.object({
  id_doador: validations.number().int().positive(),
  id_hospital: validations.number().int().positive(),
  data_agendada: validations.string().transform((str) => new Date(str)),
  hora_agendada: validations.string().transform((str) => new Date(str)),
  observacao_doador: validations.string().optional()
});

export const UpdateAgendaSchema = validations.object({
  status: validations.nativeEnum(StatusAgenda),
  observacao_hospital: validations.string().optional()
});

export const CreateHistoricoDoacaoSchema = validations.object({
  id_agenda: validations.number().int().positive(),
  id_doador: validations.number().int().positive(),
  id_hospital: validations.number().int().positive(),
  data_doacao: validations
    .string()
    .nonempty()
    .transform((str) => new Date(str)),
  observacao: validations.string().optional().nullable(),
});
