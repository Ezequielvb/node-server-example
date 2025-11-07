// src/routes/plan.routes.ts

import { Router } from 'express';
import { 
    handleCreatePlan, 
    handleListPlans, 
    handleGetPlanById,
} from './planes.controller.js';

const router = Router();

router.post('/', handleCreatePlan); 

router.get('/user/:userId', handleListPlans);

router.get('/:planId', handleGetPlanById);

//router.put('/:planId', handleUpdatePlan);
//router.delete('/:planId', handleDeletePlan);


export default router;