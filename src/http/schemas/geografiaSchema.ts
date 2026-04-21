import { validations } from "@/lib/zod";

export const CreateProvinciaSchema = validations.object({
  nome: validations.string().min(2, "Nome da província é obrigatório")
});

export const CreateMunicipioSchema = validations.object({
  id_provincia: validations.number().int().positive(),
  nome: validations.string().min(2, "Nome do município é obrigatório")
});
