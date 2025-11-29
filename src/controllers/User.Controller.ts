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

      // Llama a la clase user que usa Supabase Auth
      const { user, session } = await userModel.register(email, password);

      // Devolver los tokens de Supabase directamente
      return res.status(201).json({
        message: 'Usuario registrado con éxito',
        access_token: session?.access_token,
        refresh_token: session?.refresh_token,
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      // Error de validación de Zod
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.issues.map(issue => issue.message),
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

      // Llama a la clase user para validar con Supabase
      const session = await userModel.login(email, password);

      // Supabase devuelve una session con tokens y usuario
      const user = session.user;

      // Devolver los tokens de Supabase directamente
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        user: { id: user.id, email: user.email },
      });
    } catch (error) {
      // Error de validación de Zod
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.issues.map(issue => issue.message),
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
      // El usuario está adjunto al request desde el middleware
      const userId = req.user!.id;

      //s llama al modelo
      const user = await userModel.getProfile(userId);

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(200).json({
        message: 'Perfil obtenido con éxito',
        data: user,
      });
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
  //metodo para actualizar perfil
  static async updateProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { name, lastName, phone } = req.body;

      //mapeo d nombres para supabase
      const dataToUpdate = {
        user_name: name,
        user_lastname: lastName,
        phone: phone,
      };
      const updatedData = await userModel.updateProfile(
        userId,
        dataToUpdate as any
      );

      return res.status(200).json({
        message: 'Perfil actualizado con éxito',
        data: updatedData,
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        message: 'Error al actualizar el perfil',
        error: error.message,
      });
    }
  }
  //metodo para obtener las publicaciones de un usuario
  static async getMyPublications(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      //se usa el metodo findAll de publicacion pero filtrando por usuario
      const myPublications = await Publication.findAll({ userId: userId });
      return res.status(200).json({
        message: 'Publicaciones obtenidas con éxito',
        count: myPublications?.length || 0,
        data: myPublications,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: 'Error al obtener las publicaciones:',
        error: error.message,
      });
    }
  }

  //metodo para cerrar sesión
  static async logout(req: Request, res: Response) {
    try {
      await AuthService.signOut();
      return res.status(200).json({
        message: 'Sesión cerrada con éxito',
      });
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
      return res
        .status(500)
        .json({ message: 'Error al cerrar sesión', error: error.message });
    }
  }
}
