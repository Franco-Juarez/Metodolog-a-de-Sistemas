import { Request, Response, NextFunction} from 'express';
import { AuthService } from '../models/AuthService.Class';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message : 'Acceso denegado: Falta el token'});
    }
    const decodedUser = AuthService.verifyToken(token);
    if (!decodedUser) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
    //@ts-ignore
    req.user = decodedUser;
    next();
}