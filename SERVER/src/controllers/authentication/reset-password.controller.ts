import { Request, Response } from "express";
import { UserModel } from "../../schema";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user || !user.otp || !user.otpExpires) {
      return res.status(400).json({ message: "Invalid request" });
    }


    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }


    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;


    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
