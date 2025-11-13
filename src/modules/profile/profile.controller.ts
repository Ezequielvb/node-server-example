import type { Request, Response } from 'express';
import { getProfile, updateProfile, changePassword } from './profile.service.js';

export async function getProfileCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const profile = await getProfile(req.user.sub);
    if (!profile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.json(profile);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProfileCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const updatedProfile = await updateProfile(req.user.sub, req.body);
    res.json(updatedProfile);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'El email ya está en uso' });
    }
    res.status(500).json({ message: error.message });
  }
}

export async function changePasswordCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const { currentPassword, newPassword } = req.body;
    const result = await changePassword(req.user.sub, currentPassword, newPassword);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Contraseña actual incorrecta') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
}
