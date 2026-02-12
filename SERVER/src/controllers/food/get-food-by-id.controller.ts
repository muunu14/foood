import { Request, Response } from "express";
import mongoose from "mongoose";
import { FoodModel } from "../../schema";
export const patchfoodcontroller = async (req: Request, res: Response) => {
  try {
    const { foodId } = req.params;
    const { foodd } = req.body;
    if (!foodId || !mongoose.Types.ObjectId.isValid("foodId")) {
      return res.status(400).json({ message: "Invalid Food id" });
    }
    const { user, totalPrice, foodItems, status } = req.body;
    const updatedFood = await FoodModel.findOneAndUpdate(
      { foodId, foodd },
      {
        user,
        totalPrice,
        foodItems,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Update failed" });
  }
};
