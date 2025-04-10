"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'CategoryProduct',
        required: [true, 'Please add a category value'],
    },
    imgURL: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user value'],
    },
}, { timestamps: true });
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
