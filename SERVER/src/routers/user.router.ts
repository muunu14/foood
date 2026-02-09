import { Router } from "express";
import {
  createNewUser,
  SignIncontroller,
  requestOtp,
  verifyEmailController,
  resetPassword,
} from "../controllers/authentication";

export const userRouter = Router();

userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.post("/request-otp", requestOtp);
userRouter.post("/reset-password", resetPassword);
