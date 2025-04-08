import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CategoryProduct from '../../models/product/categoryModel';

// @desc: Get all the category
// @route: GET /api/category-products
// @access: Ptivate
const getCategories = asyncHandler(async (req: Request, res: Response) => {
  if (req.user) {
    const categories = await CategoryProduct.find({ user: req.user.id });
    res.status(200).json(categories);
  }
});

// @desc: add category
// @route: POST /api/category-products
// @access: Private
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

// @desc: delete category
// @route: DELETE /api/category-products
// @access: Private
const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = await CategoryProduct.findById(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // make sure the login user matches the link user
  if (category.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await category.deleteOne();

  res.status(200).json({ deleted: category });
});

export { getCategories, addCategory, deleteCategory };
