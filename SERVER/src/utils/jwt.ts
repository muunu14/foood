import jwt from "jsonwebtoken";
export const accesstoken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECTRET!);
{
  expiresIn: "15min";
}
