import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description value'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price value'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add a price value'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CategoryProduct',
      required: [true, 'Please add a category value'],
    },
    imgURL: {
      type: String,
      required: [false, 'Please add a price value'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user value'],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
