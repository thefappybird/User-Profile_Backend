import { Model } from "sequelize";
declare class User extends Model {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export default User;
//# sourceMappingURL=User.d.ts.map