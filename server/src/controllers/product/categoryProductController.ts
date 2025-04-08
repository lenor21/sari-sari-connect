import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CategoryProduct from '../../models/product/categoryModel';

// @desc: Get all the category
// @route: GET /api/category-products
// @access: Public
const getCategories = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const categories = await CategoryProduct.find({ user: req.user.id });
    res.status(200).json(categories);
  }
});

// @desc: add category
// @route: POST /api/category-products
// @access: Public
const addCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please fill name field');
  }

  if (req.user) {
    // check if category exist
    const categoryExists = await CategoryProduct.findOne({
      name,
      user: req.user._id,
    });

    if (categoryExists) {
      res.status(400);
      throw new Error('Category already exists');
    }

    const category = await CategoryProduct.create({ name, user: req.user._id });

    if (category) {
      res.status(200).json(category);
    } else {
      res.status(400);
      throw new Error('Invalid category data');
    }
  }
});

export { getCategories, addCategory };
