import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

// @desc: Get all the users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc: Add a new user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // check if the inputs are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  // check if the user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a new user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    generateToken(res, user._id.toString());

    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc: Sign in user
// @route: POST /api/users/sign-in
// @access: Public
const signInUser = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Sign in user' });
};

export { getUsers, addUser, signInUser };
