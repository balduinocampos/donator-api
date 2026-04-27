import { validations } from "@/lib/zod";

// ======================
// PROVÍNCIA
// ======================

export const CreateProvinciaSchema = validations.object({
  nome: validations.string().min(2, "Nome da província é obrigatório")
});

export const UpdateProvinciaSchema = validations.object({
  nome: validations.string().min(2, "Nome da província é obrigatório").optional()
});

// ======================
// MUNICÍPIO
// ======================

export const CreateMunicipioSchema = validations.object({
  id_provincia: validations.number().int().positive(),
  nome: validations.string().min(2, "Nome do município é obrigatório")
});

export const UpdateMunicipioSchema = validations.object({
  id_provincia: validations.number().int().positive().optional(),
  nome: validations.string().min(2, "Nome do município é obrigatório").optional()
});