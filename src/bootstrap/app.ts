import express from 'express';
import RateLimitServices from '@/infra/services/ratelimite/index';
import CookieService from '@/infra/services/auth/cookie';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { env } from '@/shared/env/env';

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
