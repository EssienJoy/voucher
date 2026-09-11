import {} from 'express';
import Voucher from '../model/voucherModel.js';
import mongoose from 'mongoose';
import AppError from '../utils/appError.js';
const VOUCHER_STATUSES = ['active', 'redeemed', 'expired'];
export const createVoucher = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
export const getVoucher = async (req, res, next) => {
    try {
        const businessId = new mongoose.Types.ObjectId(req.user?.id);
        const { status } = req.query;
        if (status !== undefined &&
            !VOUCHER_STATUSES.includes(status)) {
            return next(new AppError(`Invalid status filter. Must be one of: ${VOUCHER_STATUSES.join(', ')}`, 400));
        }
        const vouchers = await Voucher.find(status
            ? { business_id: businessId, status: status }
            : { business_id: businessId });
        res.status(200).json({
            status: 'success',
            data: vouchers,
            length: vouchers.length,
        });
    }
    catch (err) {
        next(err);
    }
};
export const updateVoucher = async (req, res, next) => {
    try {
        const businessId = new mongoose.Types.ObjectId(req.user?.id);
        const voucher = await Voucher.findOneAndUpdate({ _id: req.params.id, business_id: businessId }, req.body, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: voucher,
        });
    }
    catch (err) {
        next(err);
    }
};
export const deleteVoucher = async (req, res, next) => {
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
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=voucherController.js.map