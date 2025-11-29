import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../models/AuthService.Class';

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado: Falta el token' });
  }

  const user = await AuthService.verifyToken(token);

  if (!user) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }

  // Adjuntar el usuario completo de Supabase al request
  req.user = user;
  // Guardar el token para usarlo en operaciones que requieren RLS
  req.accessToken = token;
  next();
};
