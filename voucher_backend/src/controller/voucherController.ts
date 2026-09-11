import { type NextFunction, type Request, type Response } from 'express';
import Voucher, { type VoucherDocument } from '../model/voucherModel.js';
import mongoose from 'mongoose';
import ApiFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';

export const createVoucher = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const businessId = req.user?.id;

    const voucher = await Voucher.create({
      ...req.body,
      business_id: businessId,
    });

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

    // GET /voucher/:id — fetch a single voucher, scoped to this business,
    // 404 if it doesn't exist or belongs to someone else.
    if (req.params.id) {
      const voucher = await Voucher.findOne({
        _id: req.params.id,
        // business_id: businessId,
      });

      if (!voucher) {
        return next(new AppError('No voucher found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: voucher,
      });
      return;
    }

    // business_id must only ever come from the authenticated user, never
    // the client — ApiFeatures.filter() merges every remaining query key
    // straight into the Mongoose filter, and Mongoose's find() overwrites
    // conflicting keys on merge, so leaving this in would let a request
    // like GET /voucher?business_id=<other id> read another business's
    // vouchers.
    const queryParams = { ...req.query };
    delete queryParams.business_id;

    // ApiFeatures layers arbitrary query-string filtering (status, code,
    // _id, ...), sorting, field limiting, and pagination on top of the
    // business-scoped base query below. That makes this one handler cover
    // "list all", "filter by status", and "fetch a single voucher"
    // (e.g. GET /voucher?_id=<id>) alike — no separate getAllVouchers or
    // getSingleVoucher endpoint needed.
    const features = new ApiFeatures<VoucherDocument>(
      Voucher.find({ business_id: businessId }),
      queryParams,
    )
      .filter()
      .sort()
      .limit()
      .pagination();

    const vouchers = await features.query;

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

    const voucher = await Voucher.findOneAndUpdate(
      { _id: req.params.id, business_id: businessId },
      req.body,
      { new: true, runValidators: true },
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

    const voucher = await Voucher.findOneAndDelete({
      _id: req.params.id,
      business_id: businessId,
    });

    res.status(200).json({
      status: 'success',
      data: voucher,
    });
  } catch (err) {
    next(err);
  }
};
