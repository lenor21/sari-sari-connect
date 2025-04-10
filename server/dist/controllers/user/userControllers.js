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
exports.deleteUser = exports.updateUserProfile = exports.getUserProfile = exports.signOutUser = exports.signInUser = exports.addUser = exports.getUsers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../../models/user/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../../utils/generateToken"));
// @desc: Get all the users
// @route: GET /api/users
// @access: Public
const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const users = yield userModel_1.default.find({ stores: { $in: [req.user._id] } });
        res.status(200).json(users);
    }
}));
exports.getUsers = getUsers;
// @desc: Add a new user
// @route: POST /api/users
// @access: Public
const addUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    // check if the inputs are empty
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    // check if the user exists
    const userExists = yield userModel_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    // create a new user
    const user = yield userModel_1.default.create({
        name,
        email,
        password: hashedPassword,
        role,
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id.toString());
        res.status(200).json(user);
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
exports.addUser = addUser;
// @desc: Sign in user
// @route: POST /api/users/sign-in
// @access: Public
const signInUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please fill all fields');
    }
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        (0, generateToken_1.default)(res, user._id.toString());
        res.status(200).json(user);
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
}));
exports.signInUser = signInUser;
// @desc: Sign out user
// @route: POST /api/users/sign-out
// @access: Private
const signOutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'User logged out' });
}));
exports.signOutUser = signOutUser;
// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private
const getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = yield userModel_1.default.findById(req.user._id).populate({
            path: 'stores',
            select: { name: 1, role: 1 },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json(user);
    }
}));
exports.getUserProfile = getUserProfile;
// @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private
const updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = yield userModel_1.default.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                // hash password
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
                user.password = hashedPassword;
            }
            // Handle adding store IDs
            if (req.body.stores) {
                if (!user.stores.includes(req.body.stores)) {
                    user.stores.push(req.body.stores);
                }
            }
            const updatedUser = yield user.save();
            res.json(updatedUser);
        }
        else {
            res.status(404);
            throw new Error('User not found');
        }
    }
}));
exports.updateUserProfile = updateUserProfile;
// @desc: delete user
// @route: DELETE /api/users/delete
// @access: Private
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = yield userModel_1.default.findById(req.user._id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        yield user.deleteOne();
        res.status(200).json({ deleted: user });
    }
}));
exports.deleteUser = deleteUser;
