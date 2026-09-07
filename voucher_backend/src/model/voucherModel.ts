import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
      select: false,
    },
    code: { type: String, required: true },
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
    status: {
      type: String,
      enum: ['active', 'redeemed', 'expired'],
      default: 'active',
    },
    redemption_count: { type: Number, default: 0 },
    created_at: { type: Date, default: () => Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;
