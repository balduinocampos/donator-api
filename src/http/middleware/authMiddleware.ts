import { AppError } from "@/shared/error";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: number;
  role: 'hospital' | 'doador';
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    throw AppError.unauthorized('Token não enviado.');
  }

  // Verifica se está no formato "Bearer TOKEN"
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw AppError.unauthorized('Formato do token inválido.');
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback_secret'
    ) as TokenPayload;

    (req as any).user = {
      id: decoded.userId,
      role: decoded.role
    };

    return next();
  } catch (error) {
    throw AppError.unauthorized('Token inválido ou expirado.');
  }
}