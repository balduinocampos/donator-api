// prisma.config.ts
import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // Aqui você passa a URL que estava no .env
    url: process.env.DATABASE_URL,
  },
});