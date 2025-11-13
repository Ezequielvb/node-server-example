import { prisma } from '../../config/db.js';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';

export async function getProfile(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true }
  });
}

export async function updateProfile(userId: number, data: { name?: string; email?: string }) {
  return prisma.user.update({
    where: { id: userId },
    data,
    select: { id: true, email: true, name: true, createdAt: true }
  });
}

export async function changePassword(userId: number, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('Usuario no encontrado');

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) throw new Error('Contraseña actual incorrecta');

  const newHash = await bcrypt.hash(newPassword, env.BCRYPT_SALT_ROUNDS);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash },
  });

  return { message: 'Contraseña actualizada correctamente' };
}
