import { Request, Response } from 'express';

export class MessageController {
    // Crear un mensaje/comentario en una publicación
    static async create(req: Request, res: Response) {
        return res.status(501).json({
            message: '🚧 Feature en desarrollo',
            details: 'El sistema de comentarios aún no está implementado',
            status: 'coming_soon'
        });
    }

    // Obtener mensajes de una publicación
    static async getByPublicationId(req: Request, res: Response) {
        return res.status(501).json({
            message: '🚧 Feature en desarrollo',
            details: 'El sistema de comentarios aún no está implementado',
            status: 'coming_soon'
        });
    }

    // Actualizar un mensaje
    static async update(req: Request, res: Response) {
        return res.status(501).json({
            message: '🚧 Feature en desarrollo',
            details: 'El sistema de comentarios aún no está implementado',
            status: 'coming_soon'
        });
    }

    // Eliminar un mensaje
    static async delete(req: Request, res: Response) {
        return res.status(501).json({
            message: '🚧 Feature en desarrollo',
            details: 'El sistema de comentarios aún no está implementado',
            status: 'coming_soon'
        });
    }
}
