"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.addCategory = exports.getCategories = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const categoryModel_1 = __importDefault(require("../../models/product/categoryModel"));
const productModel_1 = __importDefault(require("../../models/product/productModel"));
// @desc: Get all the category
// @route: GET /api/category-products
// @access: Ptivate
const getCategories = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const categories = yield categoryModel_1.default.find({ user: req.user.id });
        res.status(200).json(categories);
    }
}));
exports.getCategories = getCategories;
// @desc: add category
// @route: POST /api/category-products
// @access: Private
const addCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('Please fill name field');
    }
    if (req.user) {
        // check if category exist
        const categoryExists = yield categoryModel_1.default.findOne({
            name,
            user: req.user._id,
        });
        if (categoryExists) {
            res.status(400);
            throw new Error('Category already exists');
        }
        const category = yield categoryModel_1.default.create({ name, user: req.user._id });
        if (category) {
            res.status(200).json(category);
        }
        else {
            res.status(400);
            throw new Error('Invalid category data');
        }
    }
}));
exports.addCategory = addCategory;
// @desc: delete category
// @route: DELETE /api/category-products
// @access: Private
const deleteCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categoryModel_1.default.findById(req.params.id);
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
    // Delete products associated with the category
    yield productModel_1.default.deleteMany({ category: category._id });
    yield category.deleteOne();
    res.status(200).json({ deleted: category });
}));
exports.deleteCategory = deleteCategory;
