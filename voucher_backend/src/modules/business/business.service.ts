import jwt from 'jsonwebtoken';
import type { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';
import bcrypt from 'bcryptjs';
import type { ParsedQs } from 'qs';

import Business, { type BusinessDocument } from './business.model.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';
import { generateApiKey } from '../../utils/apiKey.js';
import { env } from '../../config/env.js';

export function signToken(id: string): string {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES as NonNullable<SignOptions['expiresIn']>,
  });
}

export async function verifyTokenAndGetUser(token: string): Promise<BusinessDocument> {
  const verify = promisify(jwt.verify) as (
    token: string,
    secretOrPublicKey: Secret,
  ) => Promise<JwtPayload>;

  const decoded = await verify(token, env.JWT_SECRET);

  const currentUser = await Business.findById(decoded.id);
  if (!currentUser) {
    throw new AppError(
      'The  user belonging to the token does no longer exist,',
      401,
    );
  }

  return currentUser;
}

export async function createBusiness(data: {
  email?: string;
  password?: string;
  confirmPassword?: string;
}): Promise<BusinessDocument> {
  return Business.create(data);
}

export async function loginBusiness(
  email: string,
  password: string,
): Promise<BusinessDocument> {
  const business = await Business.findOne({ email }).select('+password');

  if (!business || !(await bcrypt.compare(password, business.password!))) {
    throw new AppError('Incorrect email or password', 400);
  }

  return business;
}

export async function findOrCreateGoogleBusiness(profile: {
  sub: string;
  email: string;
}): Promise<BusinessDocument> {
  let business = await Business.findOne({ google_id: profile.sub });

  if (!business) {
    business = await Business.findOne({ email: profile.email });

    if (business) {
      business.google_id = profile.sub;
      business.provider_type = 'google';
      business.providers = [
        ...new Set([...(business.providers ?? []), 'google']),
      ];
    } else {
      business = await Business.create({
        email: profile.email,
        verified: true,
        google_id: profile.sub,
        provider_type: 'google',
        providers: ['google'],
      });
    }
  }

  return business;
}

export async function getBusinessById(id: string | undefined) {
  return Business.findById(id).select(
    'business_name email createdAt apiKeyPrefix -_id',
  );
}

export async function updateBusinessName(
  id: string | undefined,
  business_name: string,
) {
  return Business.findByIdAndUpdate(
    id,
    { business_name },
    { returnDocument: 'after', runValidators: true },
  ).select('business_name email createdAt apiKeyPrefix -_id');
}

export async function regenerateApiKeyForBusiness(id: string | undefined) {
  const { rawKey, hash, prefix } = generateApiKey();

  await Business.findByIdAndUpdate(id, {
    apiKeyHash: hash,
    apiKeyPrefix: prefix,
  });

  return { rawKey, prefix };
}

export async function getBusinessByIdForAdmin(id: string | undefined) {
  return Business.findById(id).select('business_name email createdAt -_id');
}

export function getAllBusinesses(query: ParsedQs) {
  const features = new ApiFeatures<BusinessDocument>(Business.find(), query)
    .filter()
    .sort()
    .limit()
    .pagination();

  return features.query;
}