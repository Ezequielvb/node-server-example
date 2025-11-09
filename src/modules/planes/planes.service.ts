import { prisma } from '../../config/db.js';

type ActivitiesData = number[]; 

function normalizePlan(plan: any) {
    if (!plan) return plan;
    const normalized: any = { ...plan };
    if (typeof normalized.id === 'bigint') normalized.id = Number(normalized.id);
    if (typeof normalized.userId === 'bigint') normalized.userId = Number(normalized.userId);
    if (normalized.user && typeof normalized.user.id === 'bigint') {
        normalized.user = { ...normalized.user, id: Number(normalized.user.id) };
    }
    return normalized;
}

export async function createPlan(
    userId: number, 
    nombre: string, 
    activities: ActivitiesData = []
) {
    const plan = await prisma.plan.create({
        data: {
            nombre,
            activities: activities as any, 
            user: { connect: { id: userId } } 
        },
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true }
    });
    return normalizePlan(plan);
}


export async function findPlanById(id: number) {
    const plan = await prisma.plan.findUnique({
        where: { id: BigInt(id) }, 
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true, user: { select: { id: true, name: true, email: true } } }
    });
    return normalizePlan(plan);
}


export async function listPlansByUserId(userId: number) {
    const plans = await prisma.plan.findMany({
        where: { userId },
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true },
        orderBy: { createdAt: 'desc' }
    });
    return plans.map(normalizePlan);
}


export async function updatePlan(
    id: number, 
    data: { nombre?: string; activities?: ActivitiesData }
) {
    const updateData = {
        ...data,
        ...(data.activities && { activities: data.activities as any })
    };

    return prisma.plan.update({
        where: { id: BigInt(id) },
        data: updateData,
        select: { id: true, nombre: true, createdAt: true, activities: true, userId: true }
    }).then(normalizePlan);
}


export async function deletePlan(id: number) {
    const plan = await prisma.plan.delete({ where: { id: BigInt(id) }, select: { id: true, nombre: true, createdAt: true, activities: true, userId: true } });
    return normalizePlan(plan);
}