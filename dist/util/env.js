import dotenv from "dotenv";
dotenv.config();
export function getEnv(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`Missing environment variable ${name}`);
    return value;
}
//# sourceMappingURL=env.js.map