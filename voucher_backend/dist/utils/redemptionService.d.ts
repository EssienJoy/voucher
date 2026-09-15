import mongoose from 'mongoose';
import { type VoucherDocument } from '../model/voucherModel.js';
export declare function verifyVoucherByCode(code: string, businessId?: mongoose.Types.ObjectId): Promise<VoucherDocument>;
export declare function redeemVoucherByCode(code: string, options?: {
    businessId?: mongoose.Types.ObjectId | undefined;
    redeemedBy?: string | null | undefined;
}): Promise<VoucherDocument>;
//# sourceMappingURL=redemptionService.d.ts.map