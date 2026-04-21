import { defineConfig } from '@prisma/config';
import { env } from "@/shared/env/env";

export default defineConfig({
  datasource: {
    //URL que estava no .env
    url: env.DATABASE_URL,
  },
});