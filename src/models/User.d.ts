import { Model, type Optional } from "sequelize";
export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
}
export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {
}
declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
//# sourceMappingURL=User.d.ts.map