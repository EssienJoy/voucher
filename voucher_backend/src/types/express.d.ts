import 'express';
import type { BusinessDocument } from '../model/businessModel.js';
// import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: BusinessDocument;
    }
  }
}

// declare interface userType {
//   _id: Types.ObjectId;
//   email: string;
//   business_name: string | null;
//   role: 'user' | 'admin';
//   provider_type: string | null;
//   providers: [string] | null;
//   last_sign_in_at: string | null;
//   createdAt: string;
//   updatedAt: string;
//   password: null | string;
//   passwordChangedAt: Date;
//   passwordResetToken: string;
//   passwordResetExpires: Date;
//   __v: number;
// }
