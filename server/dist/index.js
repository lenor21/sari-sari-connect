"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/user/userRoutes"));
const db_1 = __importDefault(require("./configs/db"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const productRoute_1 = __importDefault(require("./routes/product/productRoute"));
const categoryProductRoute_1 = __importDefault(require("./routes/product/categoryProductRoute"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
app.use(express_1.default.json());
// recommended to always use extended: false (more secure and simple parsing)
app.use(express_1.default.urlencoded({ extended: false }));
// never forget this cookie parser when protecting routes using cookies
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoute_1.default);
app.use('/api/category-products', categoryProductRoute_1.default);
app.use(errorMiddleware_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// this is branch develop
