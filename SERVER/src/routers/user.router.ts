import { Router } from "express";
import { foodRouter } from "../routers";
import {
  createNewUser,
  SignIncontroller,
  verifyEmailController,
} from "../controllers/authentication";
import { verifyresetPasswordController } from "../controllers/authentication/verify-reset-password-request.controller";

export const userRouter = Router();
userRouter.post("/verify-password", verifyresetPasswordController);
userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.use("/foods", foodRouter);
