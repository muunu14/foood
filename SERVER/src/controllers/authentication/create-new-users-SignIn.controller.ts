import { Request, Response } from "express";
import { UserModel } from "../../schema";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mail-utils";
import bcrypt from "bcrypt";
export const SignIncontroller = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      isVerified: false,
    });
    res.status(200).send({ message: "success", data: newUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
