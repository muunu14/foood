import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema";

export const verifyresetPasswordController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "If the email exists, a reset link was sent" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
    const resetLink = `${process.env.CLIENT_URL}/authentication/reset-password?token=${token}`;
    console.log("Reset link:", resetLink);

    return res.status(200).json({ message: "Reset link sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
