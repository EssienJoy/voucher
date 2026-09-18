import {} from 'express';
import Voucher, {} from '../model/voucherModel.js';
import mongoose from 'mongoose';
import ApiFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
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
        if (req.params.id) {
            const voucher = await Voucher.findOne({
                _id: req.params.id,
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
        const queryParams = { ...req.query };
        delete queryParams.business_id;
        const features = new ApiFeatures(Voucher.find({ business_id: businessId }), queryParams)
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
    }
    catch (err) {
        next(err);
    }
};
export const updateVoucher = async (req, res, next) => {
    try {
        const businessId = new mongoose.Types.ObjectId(req.user?.id);
        const voucher = await Voucher.findOneAndUpdate({ _id: req.params.id, business_id: businessId }, req.body, { returnDocument: 'after', runValidators: true });
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