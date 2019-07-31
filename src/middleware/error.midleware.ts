import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';

export default function errorMiddleware(
  error: HttpException, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void {
  const {
    status = 500,
    message = 'Something went wrong'
  } = error;

  res
    .status(status)
    .send({
      status,
      message
    });
};