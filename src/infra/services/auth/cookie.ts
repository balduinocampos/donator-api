import { Response } from "express";
import CookieParser from "cookie-parser";
import { env } from "@/shared/env/env";

class CookieService {
  parser() {
    return CookieParser();
  }

  create(res: Response, name: string, value: any, httpOnly?: boolean) {
    res.cookie(name, value, {
      maxAge: 60 * 60 * 24 * 7 * 1000,
      sameSite: "strict",
      secure: true,
      httpOnly: httpOnly ? true : false,
      domain:
        env.ENVOIRONMENT == "production" ||
        (env.ENVOIRONMENT == "development" &&
          env.DONATOR_SERVER_ENV_API != "staging")
          ? env.API_DOMAIN_COOKIE
          : "localhost",
    });
  }
}

export default new CookieService();