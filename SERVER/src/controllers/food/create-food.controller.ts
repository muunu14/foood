import { Request, Response } from "express";
import { FoodModel } from "../../schema";
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
// {
//  "user": "65a999abc111def222333444",
//  "totalPrice": 25000,
//  "foodItems": [
//    {
//      "food": "Burger",
//      "quantity": 2
//    }
//  ],
