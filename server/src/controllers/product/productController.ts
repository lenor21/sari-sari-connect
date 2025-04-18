import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../../models/product/productModel';
import CategoryProduct from '../../models/product/categoryModel';

// @desc: Get all the products
// @route: GET /api/products
// @access: Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const products = await Product.find({ user: req.user._id })
      .populate({
        path: 'category',
        select: 'name',
      })
      .sort({
        createdAt: -1,
      });
    res.status(200).json(products);
  }
});

// @desc: add product
// @route: GET /api/products
// @access: Private
const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, quantity, category, imgURL } = req.body;

  if (!name || !description || !price || !category || !quantity) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  if (req.user) {
    // check if category exist
    const productExists = await Product.findOne({ name, user: req.user._id });

    if (productExists) {
      res.status(400);
      throw new Error('Product already exists');
    }
  }

  // check if category exists
  const categoryExists = await CategoryProduct.findOne({
    name: category,
  });

  if (categoryExists) {
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      imgURL,
      category: categoryExists._id,
      user: req.user?._id,
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400);
      throw new Error('Invalid product data');
    }
  } else {
    res.status(404);
    throw new Error('Category does not exists');
  }
});

// @desc: delete product
// @route: DELETE /api/products
// @access: Private
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // make sure the login user matches the link user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await product.deleteOne();

  res.status(200).json({ deleted: product });
});

export { getProducts, addProduct, deleteProduct };
