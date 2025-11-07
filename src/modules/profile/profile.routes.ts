import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { updateProfileSchema } from './profile.schema.js';
import { getProfileCtrl, updateProfileCtrl } from './profile.controller.js';

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado
 */
router.get('/', auth, getProfileCtrl);

/**
 * @swagger
 * /api/profile:
 *   patch:
 *     summary: Actualiza el perfil del usuario autenticado
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileInput'
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *       409:
 *         description: Email ya en uso
 */
router.patch('/', auth, validate(updateProfileSchema), updateProfileCtrl);

export default router;
