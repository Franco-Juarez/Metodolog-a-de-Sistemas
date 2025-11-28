import { z } from 'zod';

// Schema para validar registro/login
export const authSchema = z.object({
    email: z
        .string({ message: 'El email es requerido' })
        .email('El formato del email no es válido')
        .trim(),
    password: z
        .string({ message: 'La contraseña es requerida' })
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(72, 'La contraseña no puede tener más de 72 caracteres')
});

// Schema para actualizar perfil
export const updateProfileSchema = z.object({
    username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    user_lastname: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').optional(),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'El teléfono debe tener entre 10 y 15 dígitos').optional()
});

export type AuthInput = z.infer<typeof authSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
