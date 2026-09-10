import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const businessSchema = new mongoose.Schema({
    business_name: { type: String, default: null, trim: true },
    email: {
        type: String,
        required: [true, 'Email or Password is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        default: null,
        select: false,
        // required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
    },
    google_id: {
        type: String,
        // unique: true,
        default: null,
    },
    confirmPassword: {
        type: String,
        // required: [true, 'Confirm Password is required'],
        default: null,
        minlength: [8, 'Confirm Password must be at least 8 characters'],
        //Validate only runs on create or save methods
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Password are not the same',
        },
        select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    provider_type: { type: String, default: null },
    providers: { type: [String], default: [] },
    last_sign_in_at: { type: Date, default: null },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
businessSchema.pre('save', async function () {
    if (!this.password)
        return;
    if (!this.isModified('password'))
        return;
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = null;
    // next();
});
const Business = mongoose.model('Business', businessSchema);
export default Business;
//# sourceMappingURL=businessModel.js.map