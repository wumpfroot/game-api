"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const games_1 = __importDefault(require("./routes/games"));
const reqLogger_1 = __importDefault(require("./middleware/reqLogger"));
const resTime_1 = __importDefault(require("./middleware/resTime"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
// import path from "path";
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
// Body parser middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// reqLogger and resTime middleware
app.use(reqLogger_1.default);
app.use(resTime_1.default);
// static to display pages on the public folder
// app.use(express.static(path.join(__dirname, "..", "public")));
// Routes
app.use("/api/games", games_1.default);
//Error handler middleware
app.use(errorHandler_1.default);
app.listen(port, () => console.log(`Server running on port ${port}`));
