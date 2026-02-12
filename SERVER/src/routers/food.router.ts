import { Router } from "express";
import { createFood, deleteFoodList } from "../controllers/food";

export const foodRouter = Router();

foodRouter.post("/createfood", createFood);
foodRouter.delete("/deleteList", deleteFoodList);
