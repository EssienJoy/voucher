import mongoose from 'mongoose';

const redemptionSchema = new mongoose.Schema(
  {
    voucher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
      required: true,
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Business',
      required: true,
    },
    redeemed_by: { type: String, default: null },
    redeemed_at: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const Redemption = mongoose.model('Redemption', redemptionSchema);
export default Redemption;
