import express from 'express';
import RateLimitServices from '@/infra/services/ratelimite/index';
import CookieService from '@/infra/services/auth/cookie';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { env } from '@/shared/env/env';
import { router } from '@/http/routes';
import { errorHandler } from '@/http/middleware/errorHandler';

export const appExpress = express();

appExpress.use(RateLimitServices.apply());
appExpress.use(CookieService.parser());

appExpress.use(session({
  secret: env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env.ENVOIRONMENT === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

appExpress.use(cookieParser());
appExpress.use(express.json());

// 1. Injetar Rotas Principais
appExpress.use('/api', router);

// 2. Injetar Handler Global de Erros (deve ser o último middleware)
appExpress.use(errorHandler);
