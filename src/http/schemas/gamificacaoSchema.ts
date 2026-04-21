import { validations } from "@/lib/zod";

export const CreateEstatisticaSchema = validations.object({
  id_doador: validations.number().int().positive()
});
