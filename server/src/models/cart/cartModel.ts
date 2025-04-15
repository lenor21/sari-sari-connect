import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    stores: [
      {
        store: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        items: [
          {
            product: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
            },
            quantity: {
              type: Number,
              required: true,
              min: 1,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
