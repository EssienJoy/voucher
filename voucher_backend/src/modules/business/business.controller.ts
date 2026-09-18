import { type NextFunction, type Request, type Response } from 'express';
import AppError from '../../utils/appError.js';
import { env } from '../../config/env.js';
import { getRouteParam } from '../../utils/routeParam.js';
import { type BusinessDocument } from './business.model.js';
import {
  signToken,
  createBusiness,
  loginBusiness,
  findOrCreateGoogleBusiness,
  getBusinessById,
  updateBusinessName,
  regenerateApiKeyForBusiness,
  getAllBusinesses,
  getBusinessByIdForAdmin,
} from './business.service.js';

const createSendToken = (
  business: BusinessDocument,
  statusCode: number,
  req: Request,
  res: Response,
) => {
  const token = signToken(business._id.toString());

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction,
  });

  business.password = null;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: business,
  });
};

// ------------ auth handlers ------------

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newUser = await createBusiness({
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

    const business = await loginBusiness(email, password);

    createSendToken(business, 201, req, res);
  } catch (err) {
    next(err);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: 'success' });
};

export const signInWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { code, redirect_uri } = req.query;

    if (typeof code !== 'string' || !code) {
      return next(new AppError('Missing Google authorization code', 400));
    }
    if (typeof redirect_uri !== 'string' || !redirect_uri) {
      return next(new AppError('Missing redirect_uri', 400));
    }
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      return next(
        new AppError('Google OAuth is not configured on this server', 500),
      );
    }

    const tokenParams = new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri,
      grant_type: 'authorization_code',
    });

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams,
    });

    if (!tokenResponse.ok) {
      return next(new AppError('Google token exchange failed', 401));
    }

    const { access_token } = (await tokenResponse.json()) as {
      access_token: string;
    };

    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } },
    );

    if (!userInfoResponse.ok) {
      return next(new AppError('Failed to fetch Google profile', 401));
    }

    const profile = (await userInfoResponse.json()) as {
      sub: string;
      email: string;
    };

    const business = await findOrCreateGoogleBusiness(profile);

    business.last_sign_in_at = new Date();
    await business.save();

    createSendToken(business, 200, req, res);
  } catch (err) {
    next(err);
  }
};

// ------------ business curd handlers ------------

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const business = await getBusinessById(req.user?.id);

    res.status(200).json({
      status: 'success',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const business = await updateBusinessName(
      req.user?.id,
      req.body.business_name,
    );

    res.status(200).json({
      status: 'success',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};

export const regenerateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rawKey, prefix } = await regenerateApiKeyForBusiness(req.user?.id);

    res.status(200).json({
      status: 'success',
      message: 'Save this key now — it will not be shown again.',
      data: { apiKey: rawKey, apiKeyPrefix: prefix },
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
    // GET /user/:id — fetch a single business by id (e.g. admin lookup).
    if (req.params.id) {
      const business = await getBusinessByIdForAdmin(
        getRouteParam(req.params.id),
      );

      if (!business) {
        return next(new AppError('No business found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: business,
      });
      return;
    }

    const businesses = await getAllBusinesses(req.query);

    res.status(200).json({
      status: 'success',
      data: businesses,
      length: businesses.length,
    });
  } catch (err) {
    next(err);
  }
};
