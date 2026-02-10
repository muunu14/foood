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
// import { Router } from "express";
// import { createFoodCategory } from "../controllers/category/create-food-category.controller";
// import { getFoodCategory } from "../controllers/category/get-food-category.controller";
// import { updateCategory } from "../controllers/category/update-category.controller";
// import { deleteCategory } from "../controllers/category/delete-category.controller";
// const categoryRouter = Router();
// categoryRouter.post("/", createFoodCategory);
// categoryRouter.get("/", getFoodCategory);
// categoryRouter.put("/:foodCategoryId", updateCategory);
// categoryRouter.delete("/:foodCategoryId", deleteCategory);
// export default categoryRouter;
// index
// import express from "express";
// import mongoose from "mongoose";
// import categoryRouter from "./routes/category.router";
// const app = express();
// app.use(express.json());
// app.use("/category", categoryRouter);
// mongoose
//  .connect(process.env.MONGO_URI!)
//  .then(() => {
//    console.log("MongoDB connected");
//    app.listen(3000, () => console.log("Server running on 3000"));
//  })
//  .catch(console.error);