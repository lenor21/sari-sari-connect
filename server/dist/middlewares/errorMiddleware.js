"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    res.status(statusCode);
    res.json({
        message: message,
        stack: err.stack,
    });
};
exports.default = errorHandler;
