import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../../models/product/productModel';
import CategoryProduct from '../../models/product/categoryModel';

// @desc: Get all the products
// @route: GET /api/products
// @access: Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc: add product
// @route: GET /api/products
// @access: Private
const addProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, price, category, imgURL } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  // check if category exist
  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  }

  // check if category exists
  const categoryExists = await CategoryProduct.findOne({ name: category });

  if (categoryExists) {
    const product = await Product.create({
      name,
      description,
      price,
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

export { getProducts, addProduct };
