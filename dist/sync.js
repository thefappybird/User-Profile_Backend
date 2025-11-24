// sync.js
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
import sequelize from "./db/connection.js";
import User from "./models/User.js";
import Log from "./models/Log.js";
// Optional: setup associations
// Example: Log belongs to User
Log.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Log, { foreignKey: "user_id" });
async function syncDatabase() {
    try {
        // Test DB connection
        await sequelize.authenticate();
        console.log("✅ Connection to database established successfully.");
        // Sync models (create tables if they don't exist)
        // alter: true → automatically update tables to match models
        await sequelize.sync({ alter: true });
        console.log("✅ All tables synced successfully!");
    }
    catch (error) {
        console.error("❌ Unable to sync database:", error);
    }
    finally {
        // Close connection when done
        await sequelize.close();
        console.log("🔒 Database connection closed.");
    }
}
// Run the sync
syncDatabase();
//# sourceMappingURL=sync.js.map