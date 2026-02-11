import { Router } from "express";
import {
  createNewUser,
  SignIncontroller,
  verifyEmailController,
  resetPassword,
  resetPasswordRequest,
  verifyresetpasswordcontroller,
} from "../controllers/authentication";
export const userRouter = Router();
userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.post("/request-user", resetPasswordRequest);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/verify-req", verifyresetpasswordcontroller);
