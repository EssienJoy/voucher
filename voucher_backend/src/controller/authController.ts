import { type NextFunction, type Request, type Response } from 'express';
import Business from '../model/businessModel.js';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //   console.log(req.body);
  try {
    const newUser = await Business.create({
      email: req.body.email,
      password: req.body.password,
      created_at: new Date(),
    });

    res.status(201).json({
      status: 'success',
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const business = await Business.findOne({ email }).select('+password');

    // No auth process (hashing/JWT/sessions) yet — plain comparison for now
    if (!business || business.password !== password) {
      return next(new Error('Incorrect email or password'));
    }

    // business.password = undefined;

    res.status(200).json({
      status: 'success',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};
