import { Request, Response } from "express";
import { UserModel } from "../../schema";
import bcrypt from "bcrypt";
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const user = await UserModel.findOne({
      resetToken: token,
      resetTokenExp: { user: new Date() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });
    user.password = await bcrypt.hash(newPassword, 10);
    // user.resetToken = undefined;
    // user.resetTokenExp = undefined;
    await user.save();
    res.json({ message: "Password successfully reset" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
