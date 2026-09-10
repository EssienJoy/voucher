import mongoose from 'mongoose';
declare const voucherSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
    timestamps: true;
}, {
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps" | "toJSON" | "toObject"> & {
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
    timestamps: true;
}> & Omit<{
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type VoucherDocument = mongoose.HydratedDocument<mongoose.InferSchemaType<typeof voucherSchema>>;
declare const Voucher: mongoose.Model<{
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps, {}, mongoose.DefaultSchemaOptions> & {
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, {
    business_id: mongoose.Types.ObjectId;
    code: string;
    title: string;
    description?: string | null;
    discount_type: "fixed" | "percentage";
    discount_value: number;
    usage_limit: number;
    min_purchase?: number | null;
    max_discount?: number | null;
    expiry_date: NativeDate;
    status: "active" | "expired" | "redeemed";
    redemption_count: number;
} & mongoose.DefaultTimestampProps>;
export default Voucher;
//# sourceMappingURL=voucherModel.d.ts.map