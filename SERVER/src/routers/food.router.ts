import { Router } from "express";
import {
  createFood,
  deleteFoodList,
  getFoodById,
  // patchfoodcontroller,
} from "../controllers/food";
const foodRouter = Router();
foodRouter.post("/create-food", createFood);
// foodRouter.patch("/patch", patchfoodcontroller);
foodRouter.get("/getIdfood", getFoodById);
foodRouter.delete("/deleteList", deleteFoodList);
export default foodRouter;
