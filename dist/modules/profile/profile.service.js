import { prisma } from '../../config/db.js';
export async function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: { email }
    });
}
export async function updateProfile(id, data) {
    return prisma.user.update({
        where: { id },
        data,
        select: { id: true, email: true, name: true, createdAt: true }
    });
}
//# sourceMappingURL=profile.service.js.map