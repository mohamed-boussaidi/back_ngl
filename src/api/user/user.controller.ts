import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Get Profile Handler
export async function getUserHandler(_: Request, res: Response) {
  const user = res.locals.user;
  res.status(StatusCodes.OK).send(user);
}
