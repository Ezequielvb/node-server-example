import { Router } from 'express';
import { auth } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import { updateProfileSchema, changePasswordSchema, createProfileSchema } from './profile.schema.js';
import { getProfileCtrl, updateProfileCtrl, changePasswordCtrl, createProfileCtrl } from './profile.controller.js';

const router = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado con su información completa
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithProfile'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Perfil no encontrado
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', auth, getProfileCtrl);

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Crea un perfil para el usuario autenticado
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProfileInput'
 *     responses:
 *       201:
 *         description: Perfil creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       409:
 *         description: El perfil ya existe para este usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', auth, validate(createProfileSchema), createProfileCtrl);

/**
 * @swagger
 * /api/profile:
 *   patch:
 *     summary: Actualiza el perfil del usuario autenticado
 *     description: Permite actualizar tanto datos del usuario (name, email) como del perfil (username, bio, avatarUrl)
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
 *         description: Perfil actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserWithProfile'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       409:
 *         description: Email o username ya en uso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/', auth, validate(updateProfileSchema), updateProfileCtrl);

/**
 * @swagger
 * /api/profile/password:
 *   patch:
 *     summary: Cambia la contraseña del usuario autenticado
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Contraseña cambiada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada correctamente
 *       400:
 *         description: Contraseña actual incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/password', auth, validate(changePasswordSchema), changePasswordCtrl);

export default router;