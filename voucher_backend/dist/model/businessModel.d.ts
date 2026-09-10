import mongoose from 'mongoose';
declare const businessSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        virtuals: true;
    };
    toObject: {
        virtuals: true;
    };
    timestamps: true;
}, {
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
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
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type BusinessDocument = mongoose.HydratedDocument<mongoose.InferSchemaType<typeof businessSchema>>;
declare const Business: mongoose.Model<{
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
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
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
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
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
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
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    business_name?: string | null;
    email: string;
    role: "admin" | "user";
    password?: string | null;
    google_id?: string | null;
    confirmPassword?: string | null;
    passwordChangedAt?: NativeDate | null;
    passwordResetToken?: string | null;
    passwordResetExpires?: NativeDate | null;
    provider_type?: string | null;
    providers: string[];
    last_sign_in_at?: NativeDate | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default Business;
//# sourceMappingURL=businessModel.d.ts.map