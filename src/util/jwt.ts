import jwt, { type JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET || "supersecret";

export function generateToken(payload: any) {
  return jwt.sign(payload, SECRET);
}

export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, SECRET);
}
