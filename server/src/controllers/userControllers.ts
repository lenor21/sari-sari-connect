import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

// @desc: Get all the users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all users' });
});

export { getUsers };
