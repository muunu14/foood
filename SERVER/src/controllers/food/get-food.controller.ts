import { Request, Response } from "express";
import { FoodModel } from "../../schema/food.schema";

export const getFoods = async (_req: Request, res: Response) => {
  try {
    const foods = await FoodModel.find()
      .populate("categoryId")
      .sort({ createdAt: -1 });

    return res.status(200).send({ data: foods });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error fetching foods",
      error,
    });
  }
};
