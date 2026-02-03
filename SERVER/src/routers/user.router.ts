// import { createNewUser } from "../controllers/User";
// import { SignIncontroller } from "../controllers/User";
// import { Router } from "express";
// import { foodRouter } from "../routers";
// import { createFoodList } from "../controllers/food";

// export const userRouter = Router();

// userRouter.post("/user-signup", createNewUser);
// userRouter.post("/user-signin", SignIncontroller);
// userRouter.post("/foods", createFoodList);
import { Router } from "express";

import { foodRouter } from "../routers";
import {
  createNewUser,
  SignIncontroller,
  verifyEmailController,
} from "../controllers/authentication";

export const userRouter = Router();

userRouter.post("/user-signup", createNewUser);
userRouter.post("/user-signin", SignIncontroller);
userRouter.get("/verify-email", verifyEmailController);
userRouter.use("/foods", foodRouter);
