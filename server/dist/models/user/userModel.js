"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value'],
    },
    email: {
        type: String,
        required: [true, 'Please add a email value'],
        unique: true,
        validate: [validator_1.default.isEmail, 'Invalid email'],
    },
    password: {
        type: String,
        required: [true, 'Please add a name value'],
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'store'],
        default: 'user',
    },
    stores: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
