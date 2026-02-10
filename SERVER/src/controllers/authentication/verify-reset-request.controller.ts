import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../schema";
export const verifyResetPasswordRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    const { token } = req.query;
    const user = await UserModel.findById({
      resetToken: token,
      resetTokenExp: { user: new Date() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });
    res.json({ message: "Token is valid" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
