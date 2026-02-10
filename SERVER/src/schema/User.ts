import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  resetToken: String,
  resetTokenExp: Date,
});
export const UserModel = mongoose.model("User", userSchema);
