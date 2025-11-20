export interface RegisterBody {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface LoginBody {
    email: string;
    password: string;
}
export interface UpdateUserBody {
    password?: string;
    confirmPassword?: string;
    [key: string]: any;
}
//# sourceMappingURL=UserTypes.d.ts.map