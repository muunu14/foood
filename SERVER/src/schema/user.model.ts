import { Model, models, model, Schema, Types } from "mongoose";
enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRole;
  orderedFoods: Types.ObjectId[];
  ttl: Date;
  isVerified: boolean;
  resetToken: String;
  resetTokenExp: Date;
};

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    orderedFoods: {
      type: [Schema.Types.ObjectId],
      ref: "Food",
      default: [],
    },

    ttl: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 1000 * 60 * 60),
    },

    isVerified: {
      type: Boolean,
      default: false,
      otp: { type: String },
      otpExpires: { type: Date },
    },
    // resetToken
  },
  { timestamps: true },
);
export const UserModel: Model<User> =
  models.Users || model<User>("Users", UserSchema);
