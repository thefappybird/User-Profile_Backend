import jwt, {} from "jsonwebtoken";
import { getEnv } from "./env.js";
const SECRET = getEnv("JWT_SECRET") || "supersecret";
export function generateToken(payload) {
    return jwt.sign(payload, SECRET);
}
export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}
//# sourceMappingURL=jwt.js.map