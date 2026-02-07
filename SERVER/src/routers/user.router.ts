import { Router } from "express";
import {
  createNewUser,
  SignIncontroller,
  verifyEmailController,
} from "../controllers/authentication";

export const userRouter = Router();

userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
