"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reqTime = (req, res, next) => {
    req.requestTime = Date.now();
    console.lof(req.requestTime);
    next();
};
exports.default = reqTime;
