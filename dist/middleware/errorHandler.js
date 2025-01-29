"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};
exports.default = errorHandler;
