import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/shared/error';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details
    });
  }

  if (err instanceof ZodError) {
    return response.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      details: err.format()
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Erro interno no Servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
}
