import { z } from 'zod';
export const registerSchema = z.object({
    email: z.string().email('Email inválido'),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});
export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres')
});
export const updateUserSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
});
export const updateProfileSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
});
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
    newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres')
});
//# sourceMappingURL=users.schema.js.map