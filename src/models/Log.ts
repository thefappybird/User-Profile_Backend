import { DataTypes, Model, type Optional } from "sequelize";
import sequelize from "../db/connection.js";

export interface LogAttributes {
  id: string;
  user_id: string;
  action: string;
  timestamp: Date;
}

export interface LogCreationAttributes
  extends Optional<LogAttributes, "id" | "timestamp"> {}

class Log
  extends Model<LogAttributes, LogCreationAttributes>
  implements LogAttributes
{
  declare id: string;
  declare user_id: string;
  declare action: string;
  declare timestamp: Date;
}

Log.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "logs",
    timestamps: true,
    indexes: [
      { fields: ["user_id"] },
      { fields: ["action"] },
      { fields: ["timestamp"] },
    ],
  }
);

export default Log;
