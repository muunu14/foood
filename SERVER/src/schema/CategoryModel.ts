import { models, model, Schema, ObjectId } from "mongoose";

export type FoodCategory = {
  _id: ObjectId;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
};

const FoodCategorySchema = new Schema<FoodCategory>({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const CategoryModel =
  models.Foods || model<FoodCategory>("Foods", FoodCategorySchema);
