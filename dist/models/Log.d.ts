import { Model, type Optional } from "sequelize";
export interface LogAttributes {
    id: string;
    user_id: string;
    action: string;
    timestamp: Date;
}
export interface LogCreationAttributes extends Optional<LogAttributes, "id" | "timestamp"> {
}
declare class Log extends Model<LogAttributes, LogCreationAttributes> implements LogAttributes {
    id: string;
    user_id: string;
    action: string;
    timestamp: Date;
}
export default Log;
//# sourceMappingURL=Log.d.ts.map