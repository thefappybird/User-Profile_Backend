import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import publicRoutes from "./routes/publicRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { protect } from "./middlewares/auth.js";
import privateRoutes from "./routes/privateRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import Log from "./models/Log.js";
import User from "./models/User.js";
import cookieParser from "cookie-parser";
import { getEnv } from "./util/env.js";

Log.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Log, { foreignKey: "user_id" });

dotenv.config();

const app = express();
const PORT = getEnv("DB_PORT") || 3000;

app.use(cookieParser());
// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:5173"],
//   })
// );
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200, // handles older browsers
  })
);

app.use(express.json());

app.use("/user", publicRoutes);
app.use("/auth-user", protect, privateRoutes);
app.use("/auth/logs", protect, logRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
