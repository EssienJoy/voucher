import mongoose from 'mongoose';
import Voucher, { type VoucherDocument } from '../voucher/voucher.model.js';
import Redemption from './redemption.model.js';
import AppError from '../../utils/appError.js';

export async function verifyVoucherByCode(
  code: string,
  businessId?: mongoose.Types.ObjectId,
): Promise<VoucherDocument> {
  const voucher = await Voucher.findOne({
    code: code.trim().toLowerCase(),
  }).select('+business_id');

  if (!voucher || (businessId && !voucher.business_id.equals(businessId))) {
    throw new AppError('No voucher found with that code', 404);
  }

  if (
    voucher.expiry_date.getTime() < Date.now() &&
    voucher.status !== 'expired'
  ) {
    voucher.status = 'expired';
    await voucher.save({ validateBeforeSave: false });
  }

  if (voucher.status === 'expired') {
    throw new AppError('This voucher has expired', 400);
  }

  if (
    voucher.usage_limit > 0 &&
    voucher.redemption_count >= voucher.usage_limit
  ) {
    throw new AppError('This voucher has reached its usage limit', 400);
  }

  return voucher;
}

export async function redeemVoucherByCode(
  code: string,
  options: {
    businessId?: mongoose.Types.ObjectId | undefined;
    redeemedBy?: string | null | undefined;
    redemptionEmail?: string | null | undefined;
    redemptionPhoneNumber?: string | null | undefined;
  } = {},
): Promise<VoucherDocument> {
  const voucher = await verifyVoucherByCode(code, options.businessId);

  voucher.updateRedemptionCount();

  await voucher.save({ validateBeforeSave: false });

  await Redemption.create({
    voucher_id: voucher._id,
    business_id: voucher.business_id,
    redeemed_by: options.redeemedBy ?? null,
    redemption_email: options.redemptionEmail ?? null,
    redemption_phoneNumber: options.redemptionPhoneNumber ?? null,
  });

  return voucher;
}