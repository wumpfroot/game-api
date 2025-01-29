"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resTime = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`Response time: ${duration}ms`);
    });
    next();
    next();
};
exports.default = resTime;
