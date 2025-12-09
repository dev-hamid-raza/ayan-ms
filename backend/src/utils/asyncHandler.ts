import {
    Request,
    Response,
    NextFunction,
    RequestHandler,
  } from "express";
  
  export function asyncHandler<
    P = Record<string, any>,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
  >(
    fn: (
      req: Request<P, ResBody, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ): RequestHandler {
    return (req, res, next) => {
      Promise.resolve(fn(req as any, res as any, next)).catch(next);
    };
  }
  