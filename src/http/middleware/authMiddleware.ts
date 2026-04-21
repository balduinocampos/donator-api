import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '@/shared/error';

interface TokenPayload {
  userId: number;
  role: 'hospital' | 'doador';
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Ler do Cookie ou Header
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw AppError.unauthorized('Sessão expirada ou Token não enviado.');
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'fallback_secret'
    ) as TokenPayload;

    // Inject the parsed data into the request object for controllers to use
    (req as any).user = {
      id: decoded.userId,
      role: decoded.role
    };

    return next();
  } catch (error) {
    throw AppError.unauthorized('Token inválido ou malformado.');
  }
}
