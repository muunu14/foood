import { Schema, model } from "mongoose";
const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true },
);
export const CategoryModel = model("Category", CategorySchema);
