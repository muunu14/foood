import { createNewUser } from "../controllers/User";
import { SignIncontroller } from "../controllers/User";
import { Router } from "express";
import { foodRouter } from "../routers";
import { createFoodList } from "../controllers/food";

export const userRouter = Router();

userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.use("/foods", createFoodList);
