import type { Request, Response, NextFunction } from "express";
export declare const asyncHandler: <Req extends Request = Request, Res extends Response = Response>(fn: (req: Req, res: Res, next: NextFunction) => Promise<any>) => (req: Req, res: Res, next: NextFunction) => void;
//# sourceMappingURL=asyncHandler.d.ts.map