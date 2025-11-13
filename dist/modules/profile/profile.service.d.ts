export declare function getProfile(userId: number): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    profile: {
        username: string;
        id: number;
        bio: string;
        avatarUrl: string;
        updatedAt: Date;
    } | null;
    id: number;
} | null>;
export declare function createProfile(data: {
    username: string;
    bio?: string;
    avatarUrl?: string;
    userId: number;
}): Promise<{
    username: string;
    id: number;
    bio: string;
    avatarUrl: string;
    updatedAt: Date;
}>;
export declare function updateProfile(userId: number, data: {
    name?: string;
    email?: string;
    username?: string;
    bio?: string;
    avatarUrl?: string;
}): Promise<{
    name: string;
    email: string;
    createdAt: Date;
    profile: {
        username: string;
        id: number;
        bio: string;
        avatarUrl: string;
        updatedAt: Date;
    } | null;
    id: number;
} | null>;
export declare function changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=profile.service.d.ts.map