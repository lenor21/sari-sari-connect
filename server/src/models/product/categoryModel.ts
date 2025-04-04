import mongoose from 'mongoose';

const categoryProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
      unique: true,
    },
  },
  { timestamps: true }
);

const CategoryProduct = mongoose.model(
  'CategoryProduct',
  categoryProductSchema
);

export default CategoryProduct;
