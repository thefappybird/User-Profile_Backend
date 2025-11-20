import type { JwtPayload } from "jsonwebtoken";
import { UserAttributes } from "../models/User"; // import your typed User interface

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes | JwtPayload; // optional if sometimes undefined
    }
  }
}
