import mongoose from 'mongoose';
import AppError from '../utils/appError.js';
const voucherSchema = new mongoose.Schema({
    business_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: true,
        select: false,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: null },
    discount_type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
    },
    discount_value: { type: Number, required: true },
    usage_limit: { type: Number, default: 0 },
    min_purchase: { type: Number, default: null },
    max_discount: { type: Number, default: null },
    expiry_date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['active', 'redeemed', 'exhausted', 'expired'],
        default: 'active',
    },
    redemption_count: { type: Number, default: 0 },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
voucherSchema.pre('findOneAndUpdate', async function () {
    const docToUpdate = await this.model
        .findOne(this.getFilter())
        .select('status expiry_date');
    if (!docToUpdate) {
        return;
    }
    if (docToUpdate.expiry_date.getTime() < Date.now() &&
        docToUpdate.status !== 'expired') {
        docToUpdate.status = 'expired';
        await docToUpdate.save({ validateBeforeSave: false });
        throw new AppError('Cannot update a voucher that has expired', 400);
    }
    if (docToUpdate && docToUpdate.status === 'expired') {
        throw new AppError(`Cannot update a voucher that is already ${docToUpdate.status}`, 400);
    }
});
voucherSchema.methods.updateRedemptionCount = function () {
    this.redemption_count += 1;
    if (this.usage_limit > 0 && this.redemption_count < this.usage_limit) {
        return (this.status = 'redeemed');
    }
    if (this.usage_limit > 0 && this.redemption_count === this.usage_limit) {
        return (this.status = 'exhausted');
    }
};
const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;
//# sourceMappingURL=voucherModel.js.map