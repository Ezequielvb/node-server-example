import { z } from 'zod';
export const updateProfileSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    email: z.string().email('Email inválido').optional(),
});
//# sourceMappingURL=profile.schema.js.map