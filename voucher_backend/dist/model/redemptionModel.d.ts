import mongoose from 'mongoose';
declare const Redemption: mongoose.Model<{
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
    timestamps: true;
}> & Omit<{
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
    timestamps: true;
}, {
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
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
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    voucher_id: mongoose.Types.ObjectId;
    business_id: mongoose.Types.ObjectId;
    redeemed_by?: string | null;
    redeemed_at: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Redemption;
//# sourceMappingURL=redemptionModel.d.ts.map