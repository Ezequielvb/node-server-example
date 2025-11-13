export declare function register(email: string, name: string, password: string): Promise<{
    user: {
        name: string;
        email: string;
        createdAt: Date;
        id: number;
    };
    token: string;
}>;
export declare function login(email: string, password: string): Promise<{
    user: {
        id: number;
        email: string;
        name: string;
        createdAt: Date;
    };
    token: string;
}>;
//# sourceMappingURL=auth.service.d.ts.map