import mongoose from 'mongoose';
import validator from 'validator';
import { Document, Types } from 'mongoose';

interface UserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'store' | string;
  createdAt: Date;
  updatedAt: Date;
}

export type { UserDocument };

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email value'],
      unique: true,
      validate: [validator.isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'store'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
