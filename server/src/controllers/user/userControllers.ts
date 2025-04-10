import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../../models/user/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../../utils/generateToken';
import mongoose from 'mongoose';

// @desc: Get all the users
// @route: GET /api/users
// @access: Public
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const users = await User.find({ stores: req.user._id });
    res.status(200).json(users);
  }
});

// @desc: Add a new user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

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
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

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

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.status(200).json(user);
  }
});

// @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashedPassword;
      }

      // Handle adding store IDs
      if (req.body.stores) {
        if (!user.stores.includes(req.body.stores)) {
          user.stores.push(req.body.stores);
        }
      }

      const updatedUser = await user.save();

      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  }
});

// @desc: delete user
// @route: DELETE /api/users/delete
// @access: Private
const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    await user.deleteOne();

    res.status(200).json({ deleted: user });
  }
});

export {
  getUsers,
  addUser,
  signInUser,
  signOutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
