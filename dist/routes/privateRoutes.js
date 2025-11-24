import express from "express";
import { deleteUser, getCurrentUser, logoutUser, updateUser, } from "../controllers/authController.js";
const privateRoutes = express.Router();
privateRoutes.put("/update-user/:id", updateUser);
privateRoutes.delete("/delete-user/:id", deleteUser);
privateRoutes.post("/logout", logoutUser);
privateRoutes.get("/", getCurrentUser);
export default privateRoutes;
//# sourceMappingURL=privateRoutes.js.map