import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user/userModel';
import { NextFunction, Request, Response } from 'express';

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // never forget to install cookie parser package
    if (req.cookies) {
      token = req.cookies.jwt;
    }

    if (token) {
      try {
        const jwtSecret = process.env.JWT_SECRET;

        if (jwtSecret) {
          // verify token
          const decoded = jwt.verify(token, jwtSecret);

          // get user from the token
          req.user = await User.findById((decoded as JwtPayload).userId).select(
            '-password'
          );

          next();
        }
      } catch (err) {
        console.log(err);
        res.status(401);
        throw new Error('Unauthorized: Invalid token');
      }
    } else {
      res.status(401);
      throw new Error('Unauthorized: Token required');
    }
  }
);

const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && roles.includes((req.user as any).role)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};

export { protect, authorize };
