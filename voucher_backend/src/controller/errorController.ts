import { type NextFunction, type Request, type Response } from 'express';

const errorController = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
};

export default errorController;
