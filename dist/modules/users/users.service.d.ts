export declare function createUser(email: string, name: string, passwordHash: string): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    id: number;
}>;
export declare function findUserByEmail(email: string): Promise<{
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    id: number;
} | null>;
export declare function findUserById(id: number): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    id: number;
} | null>;
export declare function listUsers(): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    id: number;
}[]>;
export declare function updateUser(id: number, data: {
    name?: string;
    email?: string;
}): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    id: number;
}>;
export declare function deleteUser(id: number): Promise<{
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    id: number;
}>;
export declare function updateProfile(userId: number, data: {
    name?: string;
    email?: string;
}): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    id: number;
}>;
export declare function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=users.service.d.ts.map