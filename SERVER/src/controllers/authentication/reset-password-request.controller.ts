import { Request, Response } from "express";
import { UserModel } from "../../schema";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.AUTH_EMAIL!,
    pass: process.env.AUTH_PASS!,
  },
});

const generateToken = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};

export const resetPasswordRequest = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const token = generateToken();
    user.resetToken = token;
    user.resetTokenExp = new Date(Date.now() + 1000 * 60 * 15);

    await user.save();
    const link = `${process.env.BASE_URL}/auth/verify-reset-password-request?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "reset password",
      html: `
        <p>Password reset link):</p>
        <a href="${link}">${link}</a>
      `,
    });

    return res.json({ message: "link sent to email" });
  } catch (err) {
    console.error("ERROR", err);
    return res.status(500).json({ message: "error" });
  }
};
