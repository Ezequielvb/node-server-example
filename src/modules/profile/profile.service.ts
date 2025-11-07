import { prisma } from '../../config/db.js';

export async function findUserByEmail(email: string) {
  return prisma.profile.findUnique({
    where: { email }
  });
}

export async function updateProfile(id: number, data: { name?: string; email?: string }) {
  return prisma.profile.update({
    where: { id },
    data,
    select: { id: true, email: true, name: true, createdAt: true }
  });
}
