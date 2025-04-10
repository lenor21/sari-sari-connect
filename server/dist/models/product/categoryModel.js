"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categoryProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value'],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user value'],
    },
}, { timestamps: true });
const CategoryProduct = mongoose_1.default.model('CategoryProduct', categoryProductSchema);
exports.default = CategoryProduct;
