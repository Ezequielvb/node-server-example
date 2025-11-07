import { prisma } from '../../config/db.js';

type ActivitiesData = number[]; 

export async function createPlan(
    userId: number, 
    nombre: string, 
    activities: ActivitiesData = []
) {
    return prisma.planes.create({
        data: {
            nombre,
            activities: activities as any, 
            user: { connect: { id: userId } } 
        },
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true }
    });
}


export async function findPlanById(id: number) {
    return prisma.planes.findUnique({
        where: { id: BigInt(id) }, 
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true, user: { select: { id: true, name: true, email: true } } }
    });
}


export async function listPlansByUserId(userId: number) {
    return prisma.planes.findMany({
        where: { userId },
        select: { id: true, nombre: true, createdAt: true, activities: true },
        orderBy: { createdAt: 'desc' }
    });
}


export async function updatePlan(
    id: number, 
    data: { nombre?: string; activities?: ActivitiesData }
) {
    const updateData = {
        ...data,
        ...(data.activities && { activities: data.activities as any })
    };

    return prisma.planes.update({
        where: { id: BigInt(id) },
        data: updateData,
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true }
    });
}


export async function deletePlan(id: number) {
    return prisma.planes.delete({ where: { id: BigInt(id) } });
}