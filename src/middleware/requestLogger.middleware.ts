import { Request, Response, NextFunction } from 'express';

export default function requestLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(
    `${req.method} ${req.path} ${res.statusCode} ${new Date().toUTCString()}`
  );

  next();
}
