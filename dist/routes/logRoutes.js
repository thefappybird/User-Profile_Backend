import express from "express";
import { getAllLogs } from "../controllers/logsController.js";
const logRoutes = express.Router();
logRoutes.get("/", getAllLogs);
export default logRoutes;
//# sourceMappingURL=logRoutes.js.map