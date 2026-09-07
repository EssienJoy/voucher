import { type NextFunction, type Request, type Response } from 'express';
import Business from '../model/businessModel.js';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Will come from req.user once auth middleware is implemented
    const business = await Business.findById(req.user?.id);

    res.status(200).json({
      status: 'success',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businesses = await Business.find();

    res.status(200).json({
      status: 'success',
      data: businesses,
    });
  } catch (err) {
    next(err);
  }
};
