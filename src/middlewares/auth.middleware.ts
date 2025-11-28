import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../models/AuthService.Class';

// Extendemos la interfaz de Express para incluir al usuario en la Request
// Esto evita el uso de @ts-ignore en los controladores
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            };
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Clean Code: Extraer el header de forma segura
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: Falta el token' });
    }

    const decodedUser = AuthService.verifyToken(token);

    if (!decodedUser) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // ¡ACÁ ESTÁ LA MAGIA! ✨
    // Guardamos el usuario decodificado en la request
    req.user = decodedUser;

    next();
};