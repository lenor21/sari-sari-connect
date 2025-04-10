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
exports.deleteProduct = exports.addProduct = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../../models/product/productModel"));
const categoryModel_1 = __importDefault(require("../../models/product/categoryModel"));
// @desc: Get all the products
// @route: GET /api/products
// @access: Public
const getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const products = yield productModel_1.default.find({ user: req.user._id })
            .populate({
            path: 'category',
            select: 'name',
        })
            .sort({
            createdAt: -1,
        });
        res.status(200).json(products);
    }
}));
exports.getProducts = getProducts;
// @desc: add product
// @route: GET /api/products
// @access: Private
const addProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description, price, quantity, category, imgURL } = req.body;
    if (!name || !description || !price || !category || !quantity) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    if (req.user) {
        // check if category exist
        const productExists = yield productModel_1.default.findOne({ name, user: req.user._id });
        if (productExists) {
            res.status(400);
            throw new Error('Product already exists');
        }
    }
    // check if category exists
    const categoryExists = yield categoryModel_1.default.findOne({
        name: category,
    });
    if (categoryExists) {
        const product = yield productModel_1.default.create({
            name,
            description,
            price,
            quantity,
            imgURL,
            category: categoryExists._id,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        });
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(400);
            throw new Error('Invalid product data');
        }
    }
    else {
        res.status(404);
        throw new Error('Category does not exists');
    }
}));
exports.addProduct = addProduct;
// @desc: delete product
// @route: DELETE /api/products
// @access: Private
const deleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
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
    yield product.deleteOne();
    res.status(200).json({ deleted: product });
}));
exports.deleteProduct = deleteProduct;
