"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const reqLogger = (req, res, next) => {
    const methodColors = {
        GET: colors_1.default.green,
        POST: colors_1.default.blue,
        PUT: colors_1.default.yellow,
        DELETE: colors_1.default.red,
    };
    const methodColor = methodColors[req.method] || colors_1.default.white;
    console.log("\n----- REQUEST -----");
    console.log(methodColor(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`));
    next();
};
exports.default = reqLogger;
