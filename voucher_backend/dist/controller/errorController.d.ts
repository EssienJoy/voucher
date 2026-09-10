import { type NextFunction, type Request, type Response } from 'express';
import type AppError from '../utils/appError.js';
declare const globalErrorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
//# sourceMappingURL=errorController.d.ts.map