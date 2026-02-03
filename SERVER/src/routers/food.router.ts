// import {
//   createFoodList,
//   deleteFoodList,
//   getFoodById,
// } from "../controllers/food";
// import { Router } from "express";
// import { authentication, authorization } from "../controllers/middlewares";

// export const foodRouter = Router();
// foodRouter.post("/create-food", authentication, authorization, createFoodList);
// foodRouter.delete("/:id", deleteFoodList);
// foodRouter.get("/:foodId", getFoodById);
import { Router } from "express";
import { createFoodList } from "../controllers/food";

export const foodRouter = Router();

foodRouter.post("/", createFoodList);
