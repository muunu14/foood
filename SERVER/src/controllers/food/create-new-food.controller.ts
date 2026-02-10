// import { Request, Response } from "express";
// import { FoodModel } from "../../schema";

// export const createFoodList = async (req: Request, res: Response) => {
//   try {
//     const foods = req.body;

//     const createdFoods = await FoodModel.insertMany(foods);

//     return res.status(201).json({
//       message: "Foods created successfully",
//       data: createdFoods,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Failed to create foods" });
//   }
// };
import { Request, Response } from "express";

import { FoodModel } from "../../models/food.model";

export const createFood = async (req: Request, res: Response) => {
  try {
    const { name, price, categoryId, image, description } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).send({
        message: "name, price, categoryId required",
      });
    }

    const food = await FoodModel.create({
      name,

      price,

      categoryId,

      image,

      description,
    });

    return res.status(201).send({
      message: "Food created",

      data: food,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      message: "Error creating food",

      error,
    });
  }
};
