import { z } from 'zod';

export const updateProfileSchema = z.object({
  // Campos de User
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
  email: z.string().email('Email inválido').optional(),
  
  // Campos de Profile
  username: z.string().min(3, 'El username debe tener al menos 3 caracteres').optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().url('URL inválida').optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
  newPassword: z.string().min(8, 'La nueva contraseña debe tener al menos 8 caracteres'),
});

export const createProfileSchema = z.object({
  username: z.string().min(3, "El username debe tener al menos 3 caracteres"),
  bio: z.string().min(5, "La biografía debe tener al menos 5 caracteres").optional(), 
  avatarUrl: z.string().url('URL inválida').optional(), 
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;