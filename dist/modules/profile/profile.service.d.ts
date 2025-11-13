export declare function findUserByEmail(email: string): Promise<{
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    id: number;
} | null>;
export declare function updateProfile(id: number, data: {
    name?: string;
    email?: string;
}): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    id: number;
}>;
//# sourceMappingURL=profile.service.d.ts.map