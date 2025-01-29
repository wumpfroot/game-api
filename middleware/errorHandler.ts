import { HttpError } from "../types";
import { NextFunction, Request, Response } from "express";

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack); // Log the error for debugging
	res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};

export default errorHandler;
