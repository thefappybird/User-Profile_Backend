import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection.js";
class Log extends Model {
}
Log.init({
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
}, {
    sequelize,
    tableName: "logs",
    timestamps: true,
    indexes: [
        { fields: ["user_id"] },
        { fields: ["action"] },
        { fields: ["timestamp"] },
    ],
});
export default Log;
//# sourceMappingURL=Log.js.map