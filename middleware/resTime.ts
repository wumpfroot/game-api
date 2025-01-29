import { Request, Response, NextFunction } from "express";

const resTime = (req: Request, res: Response, next: NextFunction) => {
	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		console.log(`Response time: ${duration}ms`);
	});

	next();
	next();
};

export default resTime;
