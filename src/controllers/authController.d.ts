import type { Request, Response } from "express";
import type {
  LoginBody,
  RegisterBody,
  UpdateUserBody,
} from "../models/types/UserTypes.js";
export declare const register: (
  req: Request<
    {},
    {},
    RegisterBody,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction
) => void;
export declare const login: (
  req: Request<{}, {}, LoginBody, import("qs").ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction
) => void;
export declare const updateUser: (
  req: Request<
    {
      id: string;
    },
    {},
    UpdateUserBody,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction
) => void;
export declare const deleteUser: (
  req: Request<
    {
      id: string;
    },
    any,
    any,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction
) => void;
export declare const getCurrentUser: (
  req: Request<
    import("express-serve-static-core").ParamsDictionary,
    any,
    any,
    import("qs").ParsedQs,
    Record<string, any>
  >,
  res: Response<any, Record<string, any>>,
  next: import("express").NextFunction
) => void;
//# sourceMappingURL=authController.d.ts.map
