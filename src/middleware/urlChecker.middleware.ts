import { Request, Response, NextFunction } from 'express';
import validUrl from 'valid-url';
import UrlIsNotValidException from '../exceptions/UrlIsNotValidException';

export default function urlCheckerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): never | void {
  const { long: url } = req.body;

  if (!validUrl.isUri(url)) {
    next(new UrlIsNotValidException());
  }

  next();
}
