import cors from "cors";
import express, { Application, Request, Response } from "express";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";
import { userRouter } from "./routers";
import { foodrouter } from "./routers";
// import { foodCategoryrouter } from "./routers";
configDotenv();
const app: Application = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.use("/authentication", userRouter);
app.use("/controllers", foodrouter);
app.listen(port, () => {
  connectToMongoDB();
  console.log("http://localhost:8000");
});
