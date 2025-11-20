// tests/authController.test.ts
import { register, login } from "../controllers/authController.js";
import User from "../models/User.js";
import Log from "../models/Log.js";
import sequelize from "../db/connection.js";
import { hashPassword, comparePassword } from "../util/hash.js";
import { generateToken } from "../util/jwt.js";
jest.mock("../models/User");
jest.mock("../models/Log");
jest.mock("../db/connection");
jest.mock("../util/hashPassword");
jest.mock("../util/token");
jest.mock("../util/hashPassword", () => ({
    hashPassword: jest.fn(),
    comparePassword: jest.fn(),
}));
describe("Auth Controllers", () => {
    let mockReq;
    let mockRes;
    let mockNext;
    let mockTransaction;
    beforeEach(() => {
        mockTransaction = { commit: jest.fn(), rollback: jest.fn() };
        sequelize.transaction.mockResolvedValue(mockTransaction);
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
        mockNext = jest.fn();
    });
    describe("register", () => {
        it("should return 400 if fields are missing", async () => {
            mockReq = {
                body: { name: "", email: "", password: "", confirmPassword: "" },
            };
            await register(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Name, email, and password are required.",
            });
        });
        it("should return 400 if passwords do not match", async () => {
            mockReq = {
                body: {
                    name: "Alice",
                    email: "a@b.com",
                    password: "123",
                    confirmPassword: "456",
                },
            };
            await register(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Passwords does not match.",
            });
        });
        it("should return 400 if user already exists", async () => {
            User.findOne.mockResolvedValue({ id: "1" });
            mockReq = {
                body: {
                    name: "Alice",
                    email: "a@b.com",
                    password: "123456",
                    confirmPassword: "123456",
                },
            };
            await register(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Email already in use.",
            });
        });
        it("should create user and log action", async () => {
            User.findOne.mockResolvedValue(null);
            hashPassword.mockResolvedValue("hashedpw");
            User.create.mockResolvedValue({
                id: "1",
                name: "Alice",
                email: "a@b.com",
            });
            Log.create.mockResolvedValue({});
            mockReq = {
                body: {
                    name: "Alice",
                    email: "a@b.com",
                    password: "123456",
                    confirmPassword: "123456",
                },
            };
            await register(mockReq, mockRes, mockNext);
            expect(hashPassword).toHaveBeenCalledWith("123456");
            expect(User.create).toHaveBeenCalledWith({ name: "Alice", email: "a@b.com", password: "hashedpw" }, { transaction: mockTransaction });
            expect(Log.create).toHaveBeenCalledWith({ user_id: "1", action: "Register User" }, { transaction: mockTransaction });
            expect(mockTransaction.commit).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                user: { id: "1", name: "Alice", email: "a@b.com" },
                message: "Register Success",
            });
        });
    });
    describe("login", () => {
        it("should return 400 if email or password missing", async () => {
            mockReq = { body: { email: "", password: "" } };
            await login(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Email and password are required.",
            });
        });
        it("should return 400 if user not found", async () => {
            User.findOne.mockResolvedValue(null);
            mockReq = { body: { email: "a@b.com", password: "123456" } };
            await login(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Invalid email or password.",
            });
        });
        it("should return 400 if password invalid", async () => {
            User.findOne.mockResolvedValue({
                password: "hashedpw",
                id: "1",
                email: "a@b.com",
                name: "Alice",
            });
            comparePassword.mockResolvedValue(false);
            mockReq = { body: { email: "a@b.com", password: "wrongpw" } };
            await login(mockReq, mockRes, mockNext);
            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: "Invalid email or password.",
            });
        });
        it("should login successfully and set cookie", async () => {
            User.findOne.mockResolvedValue({
                password: "hashedpw",
                id: "1",
                email: "a@b.com",
                name: "Alice",
            });
            comparePassword.mockResolvedValue(true);
            generateToken.mockReturnValue("token123");
            Log.create.mockResolvedValue({});
            mockReq = { body: { email: "a@b.com", password: "123456" } };
            await login(mockReq, mockRes, mockNext);
            expect(generateToken).toHaveBeenCalledWith({
                id: "1",
                email: "a@b.com",
                name: "Alice",
            });
            expect(mockRes.cookie).toHaveBeenCalledWith("token", "token123", expect.any(Object));
            expect(Log.create).toHaveBeenCalledWith({ user_id: "1", action: "User Login" }, { transaction: mockTransaction });
            expect(mockTransaction.commit).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                token: "token123",
                message: "Login Success",
            });
        });
    });
});
//# sourceMappingURL=basicAuth.test.js.map