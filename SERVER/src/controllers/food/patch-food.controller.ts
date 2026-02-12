import { Request, Response } from "express";
import mongoose from "mongoose";
import { FoodModel } from "../../schema";
export const patchfoodcontroller = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;
    if (typeof foodId !== "string") {
      return res.status(400).json({ message: "invalid foodId type" });
    }
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ message: "invalid Food id" });
    }
    const { name, price, categoryId, image, description } = req.body;
    const updatedFood = await FoodModel.findByIdAndUpdate(
      foodId,
      {
        name,
        price,
        categoryId,
        image,
        description,
      },
      { new: true, runValidators: true },
    );
    if (!updatedFood) {
      return res.status(404).json({ message: "food not found" });
    }
    return res.status(200).json({
      message: "food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "update failed" });
  }
};
