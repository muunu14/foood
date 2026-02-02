import { Request, Response } from "express";
import { UserModel } from "../../schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../../utils/mail-utils";

export const SignInController = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,

      password: hashedPassword,

      isVerified: false,
    });

    const token = jwt.sign(
      { email },

      process.env.JWT_SECRET_KEY || "secret",

      { expiresIn: "10m" },
    );

    await sendVerificationEmail(
      email,

      `${process.env.TEST_API}/authentication/verify-email?token=${token}`,
    );

    return res.status(201).json({
      success: true,

      message: "Verification email sent",

      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",

      error,
    });
  }
};

// export const SignInController = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const useApi = await UserModel.findOne({ email });

//     if (!useApi) return res.status(404).send({ message: "User not Found" });

//     const isPasswordValid = await bcrypt.compare(password, useApi.password);
//     console.log(isPasswordValid);

//     if (!isPasswordValid)
//       return res.status(401).send({ messsage: "User not Found" });

//     res
//       .status(200)
//       .send({ message: "User signed in succesfully", data: useApi });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "error signed in", error: error });
//   }
// };
