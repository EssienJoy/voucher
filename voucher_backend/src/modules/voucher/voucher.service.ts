import mongoose from 'mongoose';
import type { ParsedQs } from 'qs';
import Voucher, { type VoucherDocument } from './voucher.model.js';
import ApiFeatures from '../../utils/apiFeatures.js';
import AppError from '../../utils/appError.js';

export async function createVoucherForBusiness(
  data: Record<string, unknown>,
  businessId: string | undefined,
) {
  if (!businessId) {
    throw new AppError('Business id is required to create a voucher', 401);
  }

  return Voucher.create({
    ...data,
    business_id: businessId,
  });
}

export async function getVoucherById(id: string | undefined) {
  const voucher = await Voucher.findOne({
    _id: id,
  });

  if (!voucher) {
    throw new AppError('No voucher found with that ID', 404);
  }

  return voucher;
}

export function getVouchersForBusiness(
  businessId: mongoose.Types.ObjectId,
  query: ParsedQs,
) {
  const queryParams = { ...query };
  delete queryParams.business_id;

  const features = new ApiFeatures<VoucherDocument>(
    Voucher.find({ business_id: businessId }),
    queryParams,
  )
    .filter()
    .sort()
    .limit()
    .pagination();

  return features.query;
}

export function updateVoucherForBusiness(
  id: string | undefined,
  businessId: mongoose.Types.ObjectId,
  data: Record<string, unknown>,
) {
  return Voucher.findOneAndUpdate(
    { _id: id, business_id: businessId },
    data,
    { returnDocument: 'after', runValidators: true },
  );
}

export function deleteVoucherForBusiness(
  id: string | undefined,
  businessId: mongoose.Types.ObjectId,
) {
  return Voucher.findOneAndDelete({
    _id: id,
    business_id: businessId,
  });
}