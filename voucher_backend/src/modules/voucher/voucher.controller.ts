import { type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { getRouteParam } from '../../utils/routeParam.js';
import {
  createVoucherForBusiness,
  getVoucherById,
  getVouchersForBusiness,
  updateVoucherForBusiness,
  deleteVoucherForBusiness,
} from './voucher.service.js';

export const createVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = req.user?.id;

    const voucher = await createVoucherForBusiness(req.body, businessId);

    res.status(201).json({
      status: 'success',
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
};

export const getVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = new mongoose.Types.ObjectId(req.user?.id);

    if (req.params.id) {
      const voucher = await getVoucherById(getRouteParam(req.params.id));

      res.status(200).json({
        status: 'success',
        data: voucher,
      });
      return;
    }

    const vouchers = await getVouchersForBusiness(businessId, req.query);

    res.status(200).json({
      status: 'success',
      data: vouchers,
      length: vouchers.length,
    });
  } catch (err) {
    next(err);
  }
};

export const updateVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = new mongoose.Types.ObjectId(req.user?.id);

    const voucher = await updateVoucherForBusiness(
      getRouteParam(req.params.id),
      businessId,
      req.body,
    );

    res.status(200).json({
      status: 'success',
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = new mongoose.Types.ObjectId(req.user?.id);

    const voucher = await deleteVoucherForBusiness(
      getRouteParam(req.params.id),
      businessId,
    );

    res.status(200).json({
      status: 'success',
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
};