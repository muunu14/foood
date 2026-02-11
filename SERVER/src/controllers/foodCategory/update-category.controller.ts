// import { Request, Response } from "express";
// import { CategoryModel } from "../../schema";
// export const updateCategory = async (req: Request, res: Response) => {
//   try {
//     const { foodCaetgoryId } = req.params;
//     const { categoryName } = req.body;
 
//     if (!categoryName || typeof categoryName !== "string") {
//       return res.status(400).send({ message: "Category name is required" });
//     }
 
//     const updated = await CategoryModel.findByIdAndUpdate(
//       foodCaetgoryId,
//       { categoryName },
//       { new: true },
//     );
 
//     if (!updated)
//       return res.status(404).send({ message: "Category is not found" });
 
//     return res
//       .status(200)
//       .send({ message: "Category is updated successfully", data: updated });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ message: "Failed updating category", error });
//   }
// };
 