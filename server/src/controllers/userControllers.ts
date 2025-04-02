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
const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateToken(res, user._id.toString());

    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc: Sign out user
// @route: POST /api/users/sign-out
// @access: Private
const signOutUser = asyncHandler(async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});

// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private
const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
});

export { getUsers, addUser, signInUser, signOutUser, getUserProfile };
