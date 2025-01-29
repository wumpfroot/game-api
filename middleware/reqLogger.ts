import { Request, Response, NextFunction } from "express";
import colors from "colors";

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
	const methodColors: { [key: string]: (text: string) => string } = {
		GET: colors.green,
		POST: colors.blue,
		PUT: colors.yellow,
		DELETE: colors.red,
	};

	const methodColor = methodColors[req.method] || colors.white;

	console.log("\n----- REQUEST -----");
	console.log(methodColor(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`));
	next();
};

export default reqLogger;
