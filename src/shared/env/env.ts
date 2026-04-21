import "dotenv/config";
import { z } from "zod";

const schemaEnv = z.object({
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(["mysql", "pg", "sqlite"]).default("pg"),
  JWT_SECRET: z.string(),
  API_PUBLIC_URL: z.string(),
  ENVOIRONMENT: z.enum(["development", "production", "test"]).default("development"),
  SECRET_KEY: z.string(),
  ALLOWED_HOSTS: z.string()
});

const _env = schemaEnv.safeParse(process.env);

if (_env.success == false) {
  console.error("Variáveis de ambiente inválida❌", _env.error.format());

  throw new Error("Variáveis de ambiente inválida❌");
}

export const env = _env.data;