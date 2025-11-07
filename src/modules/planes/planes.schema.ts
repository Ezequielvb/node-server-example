
import { z } from 'zod';

const activitiesSchema = z.array(z.number().int('El ID de actividad debe ser un número entero.')).optional();

export const createPlanSchema = z.object({
    nombre: z.string().min(3, 'El nombre del plan debe tener al menos 3 caracteres').max(100, 'El nombre es demasiado largo'),
    activities: activitiesSchema,

});


export const updatePlanSchema = z.object({
    nombre: z.string().min(3, 'El nombre del plan debe tener al menos 3 caracteres').max(100, 'El nombre es demasiado largo').optional(),
    activities: activitiesSchema,
});


export const planIdParamSchema = z.object({
    planId: z.string().regex(/^\d+$/, 'ID del plan inválido. Debe ser un número entero.')
});



export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
