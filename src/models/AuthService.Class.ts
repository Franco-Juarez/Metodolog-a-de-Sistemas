import jwt from 'jsonwebtoken';

// define la estructura del token para tener tipado estricto
export interface JwtPayload {
    id: string;
    role: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'michi_secreto_super_seguro';

export class AuthService {
    // se generar token tipado
    static generateJWT(userId: string, role: string): string {
        const payload: JwtPayload = { id: userId, role };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
    }

    //verifica y devuelve el payload tipado
    static verifyToken(token: string): JwtPayload | null {
        try {
            return jwt.verify(token, JWT_SECRET) as JwtPayload;
        } catch (error) {
            return null;
        }
    }
}