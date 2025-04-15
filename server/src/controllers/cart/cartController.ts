import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Cart from '../../models/cart/cartModel';
import mongoose from 'mongoose';

// @desc: Get user cart
// @route: GET /api/cart
// @access: Private
const getCart = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized: User not authenticated');
  }

  const userId = req.user._id;

  try {
    // 1. Find the user's cart and populate the 'stores.store' and 'stores.items.product' fields
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'stores',
        populate: {
          path: 'store', // Populate the 'store' field within each store
        },
      })
      .populate({
        path: 'stores.items.product', // Populate the 'product' field within each item
      });

    if (!cart) {
      res.status(200).json({ message: 'Cart is empty', cart: { stores: [] } }); // Return empty cart
      return;
    }

    res.status(200).json(cart);
  } catch (error: any) {
    console.error('Error getting cart:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
});

// @desc: add a cart item
// @route: POST /api/cart
// @access: Private
const addCartItem = asyncHandler(async (req: Request, res: Response) => {
  const { product, quantity, store } = req.body;

  if (!product || !quantity || !store) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  if (quantity <= 0) {
    res.status(400);
    throw new Error('Quantity must be greater than zero');
  }

  if (req.user) {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      const newCart = await Cart.create({
        user: userId,
        stores: [
          {
            store: store,
            items: [{ product, quantity }],
          },
        ],
      });

      res.status(200).json(newCart);
      return;
    }

    // Ensure store is an ObjectId
    const storeId = mongoose.Types.ObjectId.isValid(store)
      ? store
      : new mongoose.Types.ObjectId(store);

    const productId = mongoose.Types.ObjectId.isValid(product)
      ? product
      : new mongoose.Types.ObjectId(product);

    const storeIndex = cart.stores.findIndex((store) => {
      if (store.store) {
        return store.store.equals(storeId);
      }
    });

    if (storeIndex > -1) {
      const itemIndex = cart.stores[storeIndex].items.findIndex((item) => {
        if (item.product) {
          return item.product.equals(productId);
        }
      });

      if (itemIndex > -1) {
        cart.stores[storeIndex].items[itemIndex].quantity =
          Number(cart.stores[storeIndex].items[itemIndex].quantity) +
          Number(quantity);
      } else {
        cart.stores[storeIndex].items.push({ product: productId, quantity });
      }
    } else {
      cart.stores.push({
        store: storeId,
        items: [{ product: productId, quantity }],
      });
    }

    await cart.save();
    res.status(200).json(cart);
  }
});

export { getCart, addCartItem };
