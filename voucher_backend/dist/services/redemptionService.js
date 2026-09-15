import mongoose from 'mongoose';
import Voucher, {} from '../model/voucherModel.js';
import Redemption from '../model/redemptionModel.js';
import AppError from '../utils/appError.js';
// Shared core for all three redemption entry points (see
// REDEMPTION_STRATEGY.md): the business's own website (API key), staff in
// our dashboard (JWT), and a customer redeeming online with no login at
// all. Whoever holds the code is treated as authorized to use it — that's
// the standard model for gift cards/vouchers, and it's what makes the
// no-login case possible. `businessId`, when given, additionally scopes
// the lookup to one business's own vouchers (used by the JWT and API-key
// callers so one business can't act on another's voucher just because
// codes are globally unique).
export async function verifyVoucherByCode(code, businessId) {
    const voucher = await Voucher.findOne({
        code: code.trim().toLowerCase(),
    }).select('+business_id');
    if (!voucher || (businessId && !voucher.business_id.equals(businessId))) {
        throw new AppError('No voucher found with that code', 404);
    }
    // Nothing else in the app flips a voucher to "expired" on a timer — this
    // lazily applies that transition the moment anyone actually checks the
    // code, so the status field stays true without needing a cron job.
    if (voucher.expiry_date.getTime() < Date.now() && voucher.status !== 'expired') {
        voucher.status = 'expired';
        await voucher.save({ validateBeforeSave: false });
    }
    if (voucher.status === 'expired') {
        throw new AppError('This voucher has expired', 400);
    }
    if (voucher.status === 'redeemed') {
        throw new AppError('This voucher has already been redeemed', 400);
    }
    // usage_limit of 0 means "no cap" — matches the schema default and the
    // create/edit form, where leaving it blank is the normal case.
    if (voucher.usage_limit > 0 && voucher.redemption_count >= voucher.usage_limit) {
        throw new AppError('This voucher has reached its usage limit', 400);
    }
    return voucher;
}
export async function redeemVoucherByCode(code, options = {}) {
    const voucher = await verifyVoucherByCode(code, options.businessId);
    voucher.redemption_count += 1;
    if (voucher.usage_limit > 0 && voucher.redemption_count >= voucher.usage_limit) {
        voucher.status = 'redeemed';
    }
    await voucher.save({ validateBeforeSave: false });
    await Redemption.create({
        voucher_id: voucher._id,
        business_id: voucher.business_id,
        redeemed_by: options.redeemedBy ?? null,
    });
    return voucher;
}
//# sourceMappingURL=redemptionService.js.map