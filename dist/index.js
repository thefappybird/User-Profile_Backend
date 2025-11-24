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
import sequelize from "./db/connection.js";
Log.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Log, { foreignKey: "user_id" });
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
const allowedOrigins = [
    "http://localhost:5173",
    "https://user-profile-frontend-livid.vercel.app",
    "https://user-profile-frontend-4p3p6s2ca-thefappybirds-projects.vercel.app",
];
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200, // handles older browsers
}));
app.use(express.json());
app.use("/user", publicRoutes);
app.use("/auth-user", protect, privateRoutes);
app.use("/auth/logs", protect, logRoutes);
app.use(errorHandler);
// Connect to DB first, then start server
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error("❌ Unable to connect to the database:", err);
        process.exit(1); // Stop the app if DB fails
    }
})();
//# sourceMappingURL=index.js.map