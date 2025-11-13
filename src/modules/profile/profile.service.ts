import { prisma } from '../../config/db.js';
import bcrypt from 'bcrypt';
import { env } from '../../config/env.js';

export async function getProfile(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      id: true, 
      email: true, 
      name: true, 
      createdAt: true,
      profile: {
        select: {
          id: true,
          username: true,
          bio: true,
          avatarUrl: true,
          updatedAt: true
        }
      }
    }
  });
  
  return user;
}

export async function createProfile(data: { 
  username: string; 
  bio?: string; 
  avatarUrl?: string; 
  userId: number 
}) {
  return prisma.profile.create({
    data: {
      username: data.username,
      bio: data.bio || '',
      avatarUrl: data.avatarUrl || '',
      user: { connect: { id: data.userId } },
    },
    select: { 
      id: true, 
      username: true, 
      bio: true, 
      avatarUrl: true, 
      updatedAt: true 
    },
  });
}

export async function updateProfile(userId: number, data: { 
  name?: string; 
  email?: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
}) {
  // Separar datos de User y Profile
  const userData: { name?: string; email?: string } = {};
  const profileData: { username?: string; bio?: string; avatarUrl?: string } = {};
  
  if (data.name) userData.name = data.name;
  if (data.email) userData.email = data.email;
  if (data.username) profileData.username = data.username;
  if (data.bio) profileData.bio = data.bio;
  if (data.avatarUrl) profileData.avatarUrl = data.avatarUrl;

  // Actualizar User si hay datos
  if (Object.keys(userData).length > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  // Actualizar Profile si hay datos y existe el perfil
  if (Object.keys(profileData).length > 0) {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId }
    });

    if (existingProfile) {
      await prisma.profile.update({
        where: { userId },
        data: profileData,
      });
    }
  }

  // Devolver datos actualizados completos
  return prisma.user.findUnique({
    where: { id: userId },
    select: { 
      id: true, 
      email: true, 
      name: true, 
      createdAt: true,
      profile: {
        select: {
          id: true,
          username: true,
          bio: true,
          avatarUrl: true,
          updatedAt: true
        }
      }
    }
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