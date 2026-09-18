import { type NextFunction, type Request, type Response } from 'express';
import Business from '../model/businessModel.js';
import AppError from '../utils/appError.js';
import { hashApiKey } from '../utils/apiKey.js';

export const apiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return next(new AppError('Missing API key', 401));
    }

    const rawKey = header.split(' ')[1];
    const business = await Business.findOne({
      apiKeyHash: hashApiKey(rawKey ?? ''),
    });

    if (!business) {
      return next(new AppError('Invalid API key', 401));
    }

    req.user = business;
    next();
  } catch (err) {
    next(err);
  }
};
