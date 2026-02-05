import { Router } from "express";
import { createFoodList } from "../controllers/food";
export const foodRouter = Router();
foodRouter.post("/", createFoodList);
