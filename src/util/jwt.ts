import jwt, { type JwtPayload } from "jsonwebtoken";
import { getEnv } from "./env.js";

const SECRET = getEnv("JWT_SECRET") || "supersecret";

export function generateToken(payload: any) {
  return jwt.sign(payload, SECRET);
}

export function verifyToken(token: string): string | JwtPayload {
  return jwt.verify(token, SECRET);
}
