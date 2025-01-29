"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("../data");
const router = express_1.default.Router();
// GET all games
router.get("/", (req, res) => {
    // Makes a query minmetascore that filters all games metascores above the query
    const minmetascore = parseInt(req.query.minmetascore);
    if (minmetascore) {
        res.status(200).json(data_1.games.filter((game) => game.metascore >= minmetascore));
    }
    else {
        res.status(200).json(data_1.games);
    }
});
// GET single game
router.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const game = data_1.games.find((game) => game.id === id);
    if (!game) {
        const error = new Error(`Game with id ${id} not found`);
        error.status = 404;
        return next(error);
    }
    else {
        res.status(200).json(game);
    }
});
// POST new game (Does not get saved. Will need a database to store all the games)
router.post("/", (req, res, next) => {
    const { title, developer, metascore } = req.body;
    const newGame = {
        id: data_1.games.length + 1,
        title: title,
        developer: developer,
        metascore: metascore === "" ? NaN : metascore,
    };
    if (![title, developer].every(Boolean) || isNaN(metascore)) {
        const error = new Error(`Fill all the fields`);
        error.status = 400;
        return next(error);
    }
    data_1.games.push(newGame);
    return res.status(201).json(data_1.games);
});
// Update(PUT) game by ID
router.put("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    const game = data_1.games.find((game) => game.id === id);
    if (!game) {
        const error = new Error(`Game with id ${id} not found`);
        error.status = 404;
        return next(error);
    }
    const { title, developer, metascore } = req.body;
    // If value is not in the body, do not update it. If it is, update it.
    if (title)
        game.title = title;
    if (developer)
        game.developer = developer;
    if (metascore)
        game.metascore = metascore;
    res.status(200).json(data_1.games);
});
// DELETE game by ID
router.delete("/:id", (req, res, next) => {
    const id = parseInt(req.params.id);
    // finds the index of the game where the id param matches the game id
    const gameIndex = data_1.games.findIndex((game) => game.id === id);
    // if it returns -1 (not found) show json message
    if (gameIndex === -1) {
        const error = new Error(`Game with id ${id} not found`);
        error.status = 404;
        return next(error);
    }
    // remove one game on the index of the deleted game
    data_1.games.splice(gameIndex, 1);
    res.status(200).json(data_1.games);
});
exports.default = router;
