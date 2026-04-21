import { Request, Response } from "express";
import { IJWTDecoded } from "@/interfaces/types/jwt";
import { ECOOKIES } from "@/utils/enums";
import { env } from "@/shared/env/env";

const crypto = require("crypto");

import jwt from "jsonwebtoken";

class TokenServices {
  createToken(payload: any, exp: string) {
    //@ts-ignore
    const token = jwt.sign(
      payload,
      env.API_JWT_ECDSA_PRIVATE_KEY as string,
      {
        algorithm: "ES256",
        expiresIn: exp,
      }
    );

    return token;
  }

  generateShortHash(userId: string) {
    const hash = crypto.createHash("sha256");
    hash.update(userId.toString());
    return hash.digest("hex").slice(0, 12);
  }

  decodedToken(token: string) {
    return jwt.decode(token) as IJWTDecoded;
  }

  deleteToken(req: Request, res: Response, key: string) {
    res.clearCookie(ECOOKIES.COOKIE_USER_AUTH_TOKEN);
  }

  isValid(token: string) {
    try {
      const tokenVerified = jwt.verify(
        token,
        process.env.API_JWT_ECDSA_PUBLIC_KEY as string,
        { algorithms: ["ES256"] }
      );

      if (!tokenVerified) {
        return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}

export default new TokenServices();