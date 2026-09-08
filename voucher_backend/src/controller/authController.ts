import { type NextFunction, type Request, type Response } from 'express';
import Business, { type BusinessDocument } from '../model/businessModel.js';
import AppError from '../../utils/appError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES! as NonNullable<
      SignOptions['expiresIn']
    >,
  });
};

const createSendToken = (
  user: BusinessDocument,
  statusCode: number,
  req: Request,
  res: Response,
) => {
  const token = signToken(user._id.toString());

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  user.password = null;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not logged in, please login to get access', 401),
    );
  }

  const verifyToken = promisify(jwt.verify) as (
    token: string,
    secretOrPublicKey: Secret,
  ) => Promise<JwtPayload>;

  const decoded = await verifyToken(token, process.env.JWT_SECRET!);

  const currentUser = await Business.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The  user belonging to the token does no longer exist,',
        401,
      ),
    );
  }
  // if (currentUser.changePasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password. Please login again.', 401),
  //   );
  // }
  req.user = currentUser;
  next();
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }

    next();
  };
};

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await Business.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    createSendToken(newUser, 201, req, res);
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
    const { email, password }: { email: string; password: string } = req.body;

    if (!email || !password)
      throw new AppError('Email or Password required', 400);

    const business = await Business.findOne({ email }).select('+password');

    if (!business || !(await bcrypt.compare(password, business.password!))) {
      return next(new AppError('Incorrect email or password', 400));
    }

    createSendToken(business, 201, req, res);
  } catch (err) {
    next(err);
  }
};
