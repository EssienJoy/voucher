import { type NextFunction, type Request, type Response } from 'express';
import Business, { type BusinessDocument } from '../model/businessModel.js';
import AppError from '../../utils/appError.js';
import { env } from '../config/env.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';

const signToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES as NonNullable<SignOptions['expiresIn']>,
  });
};

const createSendToken = (
  user: BusinessDocument,
  statusCode: number,
  req: Request,
  res: Response,
) => {
  const token = signToken(user._id.toString());

  // Cookie rule (browsers enforce this, it's not optional): a cookie marked
  // "SameSite=None" is ONLY accepted by the browser if it is ALSO marked
  // "Secure". If you set sameSite to 'none' but secure is false (which it
  // is in local development, since we're on http:// not https://), the
  // browser silently throws the cookie away — no error, it just never
  // shows up. That was one reason the browser "wasn't getting the token".
  // Fix: only use 'none' in production (where we're on https and secure
  // is true); use 'lax' in development, which works fine over plain http.
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true, // JS in the browser can't read this cookie (XSS protection)
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction, // must be true whenever sameSite is 'none'
  });

  user.password = null;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: user,
  });
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
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

  const decoded = await verifyToken(token, env.JWT_SECRET);

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
