import type { Request, Response } from 'express';
export declare function listUsersCtrl(_req: Request, res: Response): Promise<void>;
export declare function getUserCtrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function meCtrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateUserCtrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteUserCtrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateProfileCtrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function changePasswordCtrl(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=users.controller.d.ts.map