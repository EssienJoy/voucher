import { type NextFunction, type Request, type Response } from 'express';
export declare const logout: (req: Request, res: Response) => void;
export declare const protect: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const restrictTo: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authController.d.ts.map