import { validations } from "@/lib/zod";
import { StatusHospital } from '@/domain/enums';

export const CreateHospitalSchema = validations.object({
  nome: validations.string().min(2),
  nif: validations.string().min(5),
  id_municipio: validations.number().int().positive(),
  endereco: validations.string().min(5),
  telefone: validations.string().min(9),
  email: validations.string().email(),
  senha: validations.string().min(6).optional()
});

export const UpdateHospitalSchema = validations.object({
  nome: validations.string().optional(),
  nif: validations.string().optional(),
  endereco: validations.string().optional(),
  telefone: validations.string().optional(),
  status: validations.nativeEnum(StatusHospital).optional()
});
