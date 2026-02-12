import express, { Application } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectToMongoDB from "./mongodb";
import { userRouter } from "./routers";
import { foodRouter } from "./routers";

configDotenv();

const app: Application = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/authentication", userRouter);
app.use("/food", foodRouter);

app.listen(port, () => {
  connectToMongoDB();
  console.log("http://localhost:8000");
});
