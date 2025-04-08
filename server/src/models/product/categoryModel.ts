import mongoose from 'mongoose';

const categoryProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user value'],
    },
  },
  { timestamps: true }
);

const CategoryProduct = mongoose.model(
  'CategoryProduct',
  categoryProductSchema
);

export default CategoryProduct;
