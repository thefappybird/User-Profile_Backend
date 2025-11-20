// db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

const sequelize = new Sequelize(
  getEnv("DB_NAME"),
  getEnv("DB_USER"),
  getEnv("DB_PASSWORD"),
  {
    host: getEnv("DB_HOST"),
    dialect: "mysql",
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
    logging: false,
  }
);

export default sequelize;
