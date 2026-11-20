import { Request, Response, NextFunction } from 'express';

// Responsabilidad: Middleware centralizado para el manejo de errores
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
};

export default errorHandler;
