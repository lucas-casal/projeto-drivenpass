import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { errors } from '../errors/errors';
import { authenticationRepository } from '../repositories/authentication.repository';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw errors.unauthorizedError();

  const token = authHeader.split(' ')[1];

  if (!token) throw errors.unauthorizedError();
  
  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

  const session = await authenticationRepository.findSession(token);
  if (!session) throw errors.unauthorizedError();

  req.userId = userId;
  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};