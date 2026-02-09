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
export const requestOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    await user.save();

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "otp Code",
      html: `<h2>otp Code</h2><b></b><p>Valid</p>`,
    });

    return res.status(200).json({ message: "sent" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
