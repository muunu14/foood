import { Schema, model, Types } from "mongoose";

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

export const FoodModel = model("Food", FoodSchema);
