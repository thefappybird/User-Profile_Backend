import express from "express";
import { login, register } from "../controllers/authController.js";
const publicRoutes = express.Router();
publicRoutes.post("/register", register);
publicRoutes.post("/login", login);
export default publicRoutes;
//# sourceMappingURL=publicRoutes.js.map