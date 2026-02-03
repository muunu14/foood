// import { Response } from "express";

// export const crreateFood = async (req: Request, res: Response) => {
//   res.status(200).send({
//     messege: "Success",
//   });
// };
import {NextFunction,Request,Response}from "express"
export const authorization=async(req:Request,res:Response,next:NextFunction)=>{
  
}