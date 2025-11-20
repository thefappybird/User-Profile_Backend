// middlewares/authMiddleware.js
import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../util/jwt.js";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.cookies?.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized, token missing." });
  }

  try {
    const decoded = verifyToken(token) as {
      id: string;
      email: string;
      name: string;
    };

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
