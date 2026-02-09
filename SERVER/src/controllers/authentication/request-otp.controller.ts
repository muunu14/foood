import { Request, Response } from "express";
import { UserModel } from "../../schema";
import bcrypt from "bcrypt";
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
      return res.status(400).json({ message: "Email required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP Code</h2><b>${otp}</b><p>Valid for 5 minutes</p>`,
    });

    return res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


// export const requestOtp = async (req: Request, res: Response) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otp = crypto.randomInt(100000, 999999).toString();
//     const hashedOtp = await bcrypt.hash(otp, 10);

//     user.otp = hashedOtp;
//     user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
//     await user.save();

//     await transporter.sendMail({
//       from: process.env.AUTH_EMAIL,
//       to: email,
//       subject: "Your OTP Code",
//       html: `<h2>Your OTP Code</h2><b>${otp}</b><p>Valid for 5 minutes</p>`,
//     });

//     return res.status(200).json({ message: "OTP sent" });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };
