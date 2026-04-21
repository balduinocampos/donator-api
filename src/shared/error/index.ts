export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(message: string, statusCode?: number, details?: unknown, isOperational = true) {
    super(message);

    this.name = "AppError";

    // Validação do statusCode
    if (!statusCode) {
      this.statusCode = 400; // padrão
    } else if (statusCode >= 400 && statusCode < 600) {
      this.statusCode = statusCode;
    } else {
      console.warn(`Status code inválido (${statusCode}) definido como 500`);
      this.statusCode = 500; // fallback para erros inesperados
    }

    this.isOperational = isOperational;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  // Métodos de atalho para os principais tipos de erro
  static badRequest(message: string, details?: unknown) {
    return new AppError(message, 400, details);
  }

  static unauthorized(message: string, details?: unknown) {
    return new AppError(message, 401, details);
  }

  static forbidden(message: string, details?: unknown) {
    return new AppError(message, 403, details);
  }

  static notFound(message: string, details?: unknown) {
    return new AppError(message, 404, details);
  }

  static conflict(message: string, details?: unknown) {
    return new AppError(message, 409, details);
  }

  static internal(message: string, details?: unknown) {
    return new AppError(message, 500, details, false);
  }
}