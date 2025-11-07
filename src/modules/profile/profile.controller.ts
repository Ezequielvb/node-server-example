import type { Request, Response } from 'express';
import { findUserByEmail, updateProfile } from './profile.service.js';

export async function getProfileCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProfileCtrl(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const updated = await updateProfile(req.user.sub, req.body);
    res.json(updated);

  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'El email ya está en uso' });
    }
    res.status(500).json({ message: error.message });
  }
}
