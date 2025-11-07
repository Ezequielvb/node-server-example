import type { Request, Response, NextFunction } from 'express';
import * as planService from './planes.service.js';

export async function handleCreatePlan(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.body.userId || 1; 

        const { nombre, activities } = req.body; 

        if (!nombre) {
            return res.status(400).json({ message: 'El nombre del plan es obligatorio.' });
        }

        const newPlan = await planService.createPlan(userId, nombre, activities);
        return res.status(201).json(newPlan);
    } catch (error) {
        next(error);
    }
}


export async function handleListPlans(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = parseInt(req.body.userId);

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID de usuario inválido.' });
        }

        const plans = await planService.listPlansByUserId(userId);
        return res.status(200).json(plans);
    } catch (error) {
        next(error);
    }
}

export async function handleGetPlanById(req: Request, res: Response, next: NextFunction) {
    try {
        const planId = parseInt(req.body.planId);

        if (isNaN(planId)) {
            return res.status(400).json({ message: 'ID de plan inválido.' });
        }

        const plan = await planService.findPlanById(planId);

        if (!plan) {
            return res.status(404).json({ message: 'Plan no encontrado.' });
        }

        return res.status(200).json(plan);
    } catch (error) {
        next(error);
    }
}

// Implementaciones similares para PUT/PATCH y DELETE...