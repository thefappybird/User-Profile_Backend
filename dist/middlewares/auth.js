import { verifyToken } from "../util/jwt.js";
export const protect = (req, res, next) => {
    let token;
    if (req.cookies?.token) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.status(401).json({ error: "Not authorized, token missing." });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid token." });
    }
};
//# sourceMappingURL=auth.js.map