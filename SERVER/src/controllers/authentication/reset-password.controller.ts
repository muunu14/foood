import { Request, Response } from "express";
import { UserModel } from "../../schema";
import bcrypt from "bcrypt";
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: "required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid request" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "password success" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
