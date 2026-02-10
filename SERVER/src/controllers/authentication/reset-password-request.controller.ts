import { Request, Response } from "express";
import { UserModel } from "../../schema";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = Math.floor(32).toString(40);
    user.resetToken = token;
    user.resetTokenExp = new Date(Date.now() + 1000 * 60 * 15);
    await user.save();
    const link = `${process.env.BASE_URL}/auth/verify-reset-password-request?token=${token}`;
    await transporter.sendMail({
      to: email,
      subject: "Reset password",
      html: `<p>Password reset link:</p><a href="${link}">${link}</a>`,
    });
    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
