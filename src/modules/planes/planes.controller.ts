import type { Request, Response, NextFunction } from 'express';
import * as planService from './planes.service.js';

export async function handleCreatePlan(req: Request, res: Response, next: NextFunction) {
    try {
        // Use authenticated user id
        const user = req.user;
        if (!user) return res.status(401).json({ message: 'No autorizado' });

        const { nombre, activities } = req.body;

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del plan es obligatorio.' });
        }

        const newPlan = await planService.createPlan(user.sub, nombre, activities);
        return res.status(201).json(newPlan);
    } catch (error) {
        next(error);
    }
}


export async function handleListPlans(req: Request, res: Response, next: NextFunction) {
    try {
        const authUser = req.user;
        if (!authUser) return res.status(401).json({ message: 'No autorizado' });

        // Ensure user can only list their own plans
    const userIdParam = parseInt(String(req.params.userId));
        if (isNaN(userIdParam)) {
            return res.status(400).json({ message: 'ID de usuario inválido.' });
        }

        if (userIdParam !== authUser.sub) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const plans = await planService.listPlansByUserId(userIdParam);
        return res.status(200).json(plans);
    } catch (error) {
        next(error);
    }
}

export async function handleGetPlanById(req: Request, res: Response, next: NextFunction) {
    try {
        const authUser = req.user;
        if (!authUser) return res.status(401).json({ message: 'No autorizado' });

    const planId = parseInt(String(req.params.planId));
        if (isNaN(planId)) {
            return res.status(400).json({ message: 'ID de plan inválido.' });
        }

        const plan = await planService.findPlanById(planId);

        if (!plan) {
            return res.status(404).json({ message: 'Plan no encontrado.' });
        }

        // plan.userId might be BigInt depending on Prisma setup; compare by string
        const planUserId = typeof plan.userId === 'bigint' ? Number(plan.userId) : plan.userId;
        if (planUserId !== authUser.sub) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        return res.status(200).json(plan);
    } catch (error) {
        next(error);
    }
}
