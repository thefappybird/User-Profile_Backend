// db.js
import { Sequelize } from "sequelize";
import { getEnv } from "../util/env.js";
const sequelize = new Sequelize(getEnv("DB_NAME"), getEnv("DB_USER"), getEnv("DB_PASSWORD"), {
    host: getEnv("DB_HOST"),
    dialect: "mysql",
    port: 3306,
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    dialectOptions: {
        ssl: {
            require: true,
        },
    },
    logging: false,
});
export default sequelize;
//# sourceMappingURL=connection.js.map