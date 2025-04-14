import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET;

  if (jwtSecret) {
    const token = jwt.sign({ userId }, jwtSecret, {
      expiresIn: '1d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict', // Prevent CSRF attacks
      // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      maxAge: 60 * 1000, // 1 minute
    });
  } else {
    res.status(400);
    throw new Error('JWT_SECRET environment variable is not defined.');
  }
};

export default generateToken;
