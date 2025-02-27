import express, { NextFunction, Request, Response, Router } from "express";
import { games } from "../data";
import { gameTypes, HttpError } from "../types";

const router: Router = express.Router();

// GET all games
router.get("/", (req: Request, res: Response) => {
	// Makes a query minmetascore that filters all games metascores above the query
	const minmetascore: number = parseInt(req.query.minmetascore as string);
	if (minmetascore) {
		res.status(200).json(games.filter((game) => game.metascore >= minmetascore));
	} else {
		res.status(200).json(games);
	}
});

// GET single game
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
	const id: number = parseInt(req.params.id);
	const game: gameTypes | undefined = games.find((game) => game.id === id);

	if (!game) {
		const error = new Error(`Game with id ${id} not found`);
		(error as HttpError).status = 404;
		return next(error);
	} else {
		res.status(200).json(game);
	}
});

// POST new game (Does not get saved. Will need a database to store all the games)
router.post("/", (req: Request, res: Response, next: NextFunction) => {
	const { title, developer, metascore, platforms, releaseDate, isEarlyAccess } = req.body;
	const newGame: gameTypes = {
		id: games.length + 1,
		title: title,
		developer: developer,
		metascore: metascore === "" ? NaN : metascore,
		platforms: [platforms],
		releaseDate: releaseDate,
		isEarlyAccess: isEarlyAccess,
	};
	if (![title, developer, platforms, releaseDate, isEarlyAccess].every(Boolean) || isNaN(metascore)) {
		const error = new Error(`Fill all the fields`);
		(error as HttpError).status = 400;
		return next(error);
	}
	games.push(newGame);
	return res.status(201).json(games);
});

// Update(PUT) game by ID
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
	const id: number = parseInt(req.params.id);
	const game: gameTypes | undefined = games.find((game) => game.id === id);

	if (!game) {
		const error = new Error(`Game with id ${id} not found`);
		(error as HttpError).status = 404;
		return next(error);
	}

	const { title, developer, metascore, platforms, releaseDate, isEarlyAccess } = req.body;

	// If value is not in the body, do not update it. If it is, update it.
	if (title) game.title = title;
	if (developer) game.developer = developer;
	if (metascore) game.metascore = metascore;
	if (platforms) game.platforms = platforms;
	if (releaseDate) game.releaseDate = releaseDate;
	if (isEarlyAccess) game.isEarlyAccess = isEarlyAccess;

	res.status(200).json(games);
});

// DELETE game by ID
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
	const id: number = parseInt(req.params.id);

	// finds the index of the game where the id param matches the game id
	const gameIndex: number = games.findIndex((game) => game.id === id);
	// if it returns -1 (not found) show json message
	if (gameIndex === -1) {
		const error = new Error(`Game with id ${id} not found`);
		(error as HttpError).status = 404;
		return next(error);
	}
	// remove one game on the index of the deleted game
	games.splice(gameIndex, 1);
	res.status(200).json(games);
});

export default router;
