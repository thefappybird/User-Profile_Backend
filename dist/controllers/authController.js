import User from "../models/User.js";
import Log from "../models/Log.js";
import dotenv from "dotenv";
import { comparePassword, hashPassword } from "../util/hash.js";
import { generateToken } from "../util/jwt.js";
import { asyncHandler } from "../util/asyncHandler.js";
import sequelize from "../db/connection.js";
const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    dotenv.config();
}
export const register = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res
            .status(400)
            .json({ error: "Name, email, and password are required." });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords does not match." });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
        return res.status(400).json({ error: "Email already in use." });
    const transaction = await sequelize.transaction();
    try {
        const hashed = await hashPassword(password);
        const user = await User.create({ name, email, password: hashed }, { transaction });
        await Log.create({ user_id: user.id, action: "Register User" }, { transaction });
        await transaction.commit();
        res.status(201).json({
            user: { id: user.id, name: user.name, email: user.email },
            message: "Register Success",
        });
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
});
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email and password are required." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password." });
    }
    const transaction = await sequelize.transaction();
    try {
        const token = generateToken({
            id: user.id,
            email: user.email,
            name: user.name,
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        await Log.create({ user_id: user.id, action: "User Login" }, { transaction });
        await transaction.commit();
        res.status(201).json({ token, message: "Login Success" });
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
});
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.json({ message: "Logged out" });
});
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    const transaction = await sequelize.transaction();
    try {
        const user = await User.findByPk(id, { transaction });
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ error: "User not found" });
        }
        if (password) {
            if (password !== confirmPassword) {
                await transaction.rollback();
                return res.status(400).json({ error: "Passwords do not match." });
            }
            req.body.password = await hashPassword(password);
        }
        await user.update(req.body, { transaction });
        await Log.create({ user_id: id, action: "Update User" }, { transaction });
        await transaction.commit();
        const currentUser = {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        const token = generateToken(currentUser);
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.json({ message: "User updated successfully", currentUser });
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
});
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const transaction = await sequelize.transaction();
    try {
        const user = await User.findByPk(id, { transaction });
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy({ transaction });
        await Log.create({ user_id: id, action: "Delete User" }, { transaction });
        await transaction.commit();
        return res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
});
export const getCurrentUser = asyncHandler(async (req, res) => {
    // req.user is now correctly typed
    if (!req.user)
        return res.status(401).json({ error: "Not authenticated" });
    return res.json(req.user);
});
//# sourceMappingURL=authController.js.map