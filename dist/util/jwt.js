import jwt, {} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.JWT_SECRET || "supersecret";
export function generateToken(payload) {
    return jwt.sign(payload, SECRET);
}
export function verifyToken(token) {
    return jwt.verify(token, SECRET);
}
//# sourceMappingURL=jwt.js.map