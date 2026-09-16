import { type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/appError.js';
import {
  verifyVoucherByCode,
  redeemVoucherByCode,
} from '../utils/redemptionService.js';

export const verifyVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = req.user?.id
      ? new mongoose.Types.ObjectId(req.user.id)
      : undefined;

    const code = req.params.code;
    if (typeof code !== 'string' || !code.trim()) {
      return next(new AppError('Voucher code is required', 400));
    }

    const voucher = await verifyVoucherByCode(code, businessId);

    res.status(200).json({
      status: 'success',
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
};

export const redeemVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = req.user?.id
      ? new mongoose.Types.ObjectId(req.user.id)
      : undefined;

    const bodyRedeemedBy =
      typeof req.body?.redeemed_by === 'string' && req.body.redeemed_by.trim()
        ? req.body.redeemed_by.trim()
        : null;

    const redeemedBy =
      bodyRedeemedBy ?? req.user?.business_name ?? req.user?.email ?? null;

    const bodyEmail =
      typeof req.body?.redemption_email === 'string' &&
      req.body.redemption_email.trim()
        ? req.body.redemption_email.trim()
        : null;

    const bodyPhoneNumber =
      typeof req.body?.redemption_phoneNumber === 'string' &&
      req.body.redemption_phoneNumber.trim()
        ? req.body.redemption_phoneNumber.trim()
        : null;

    const code = req.params.code;
    if (typeof code !== 'string' || !code.trim()) {
      return next(new AppError('Voucher code is required', 400));
    }

    const voucher = await redeemVoucherByCode(code, {
      businessId,
      redeemedBy,
      redemptionEmail: bodyEmail,
      redemptionPhoneNumber: bodyPhoneNumber,
    });

    res.status(200).json({
      status: 'success',
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
};
