import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../models/AuthService.Class';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
            } | null;
        }
    }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized',message: 'Acceso denegado: Falta el token' });
    }

    try {
        const userData = AuthService.verifyToken(token);
        if (!userData) {
            return res.status(403).json({ error: 'Forbidden', message: 'Token inválido o expirado' });
        }
        req.user = userData;
        next();
        
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden', message: 'Token inválido o expirado' });
    }
};