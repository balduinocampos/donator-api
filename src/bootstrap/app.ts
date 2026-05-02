import express from 'express';
import RateLimitServices from '@/infra/services/ratelimite/index';
import { router } from '@/http/routes';
import { errorHandler } from '@/http/middleware/errorHandler';

export const appExpress = express();

appExpress.use((req, res, next) => {
  console.log("REQUEST CHEGOU:", req.url);
  next();
});

appExpress.get("/test", (req, res) => {
  res.json({ ok: true });
});

appExpress.use(RateLimitServices.apply());

appExpress.use(express.json());

// 1. Injetar Rotas Principais
appExpress.use('/api', router);

// 2. Injetar Handler Global de Erros (deve ser o último middleware)
appExpress.use(errorHandler);
