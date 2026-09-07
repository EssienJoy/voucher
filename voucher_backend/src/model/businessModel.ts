import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    business_name: { type: String, default: null, trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
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
      required: false,
      unique: true,
    },
    confirmPassword: {
      type: String,
      // required: [true, 'Confirm Password is required'],
      default: null,
      minlength: [8, 'Confirm Password must be at least 8 characters'],
      //Validate only runs on create or save methods
      validate: {
        validator: function (el: string | null): boolean {
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
    created_at: { type: Date, default: () => Date.now() },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Business = mongoose.model('Business', businessSchema);
export default Business;

// userSchema.pre('save', async function (next) {
//   // Only run this function if password
//   //  was actually modified
//   if (!this.isModified('password')) return;

//   // Hash the password
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete password confirmed field
//   this.confirmPassword = undefined;
//   // next();
// });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password') || this.isNew) return;

//   this.passwordChangedAt = Date.now() - 1000;
//   // next();
// });

// userSchema.pre(/^find/, async function (next) {
//   this.find({ active: { $ne: false } });
// });

// // Instance method is amethod available
// //  on all docs of a collection
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword,
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changeTimeStamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10,
//     );

//     return JWTTimestamp < changeTimeStamp;
//   }

//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex');
//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };
// const User = mongoose.model('User', userSchema);

// module.exports = User;
