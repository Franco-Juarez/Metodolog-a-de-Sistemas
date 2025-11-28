import { Request, Response } from 'express';
import { User } from '../models/User.Class';
import { AuthService } from '../models/AuthService.Class';
import { authSchema } from '../utils/validators';
import { ZodError } from 'zod';
import { Publication } from '../models/publications/Publication.Class';

//instancio la clase User
const userModel = new User();

export class UserController {
    //metodo para registrar usuarios
    static async register(req: Request, res: Response) {
       try {
         // Validar entrada
         const { email, password } = authSchema.parse(req.body);

        //s llama a la clase user q usa supabase
        const newUser = await userModel.register(email, password);

        //si supabase lo crea se genera el token interno
        //usamos el id de supabase para el token
        const token = AuthService.generateJWT(newUser.id, 'standard');
        return res.status(201).json({
            message: 'Usuario registrado con éxito',
            token: token,
            user: { id: newUser.id, email: newUser.email}
        });
    } catch (error) {
            // Error de validación de Zod
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: 'Error de validación',
                    errors: error.issues.map((issue) => issue.message)
                });
            }

            // Errores de Supabase ya mapeados
            if (error instanceof Error && error.message) {
                return res.status(400).json({ message: error.message });
            }

            console.error('Error en registro:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    //metodo para iniciar sesión
    static async login(req: Request, res: Response) {
        try {
            // Validar entrada
            const { email, password } = authSchema.parse(req.body);

            //llama a la clase user para validar con supabase
            const session = await userModel.login(email, password);

            //supabase devuelve una session, sacamos el user d ahi
            const user = session.user;

            //s genera el token interno
            const token = AuthService.generateJWT(user.id, 'standard');
            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token: token,
                user: { id: user.id, email: user.email }
            });
        } catch (error) {
            // Error de validación de Zod
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: 'Error de validación',
                    errors: error.issues.map((issue) => issue.message)
                });
            }

            // Errores de Supabase ya mapeados
            if (error instanceof Error && error.message) {
                return res.status(401).json({ message: error.message });
            }

            console.error('Error en login:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    //metodo para obtener perfil
    static async getProfile(req: Request, res: Response) {
        try {
            //se saca el id del token
            //@ts-ignore
            const userId = req.user.id;

            //s llama al modelo
            const user = await userModel.getProfile(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            return res.status(200).json({
                message: 'Perfil obtenido con éxito',
                data: user
            });
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    //metodo para actualizar perfil
    static async updateProfile(req: Request, res: Response) {
        try {
            //@ts-ignore
            const userId = req.user.id;
            const { name, lastName, phone } = req.body;

            //mapeo d nombres para supabase
            const dataToUpdate = {
                user_name: name,
                user_lastname: lastName,
                phone: phone
            };
            const updatedData = await userModel.updateProfile(userId, dataToUpdate as any);

            if (!updatedData) {
                return res.status(400).json({ message: 'No se pudo actualizar el perfil' });
            }

            return res.status(200).json({
                message: 'Perfil actualizado con éxito',
                data: updatedData
            });
        } catch (error : any) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
        }
    }
    //metodo para obtener las publicaciones de un usuario
    static async getMyPublications(req: Request, res: Response) {
        try {
            //@ts-ignore
            const userId = req.user.id;

            //se usa el metodo findAll de publicacion pero filtrando por usuario
            const myPublications = await Publication.findAll({ userId: userId });
            return res.status(200).json({
                message: 'Publicaciones obtenidas con éxito',
                count: myPublications?.length || 0,
                data: myPublications
            });
            
        } catch (error : any) {
            console.error(error);
            return res.status(500).json({ message: 'Error al obtener las publicaciones:', error: error.message });
        }
        }
}