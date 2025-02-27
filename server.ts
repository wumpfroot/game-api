import express, { Express, Request, Response, NextFunction } from "express";
import "dotenv/config";
import games from "./routes/games";
import reqLogger from "./middleware/reqLogger";
import resTime from "./middleware/resTime";
import errorHandler from "./middleware/errorHandler";
// import path from "path";
const port = process.env.PORT || 8000;

const app: Express = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Welcome to the Game API. Go to /api/games to see all the games.</h1>");
});

// reqLogger and resTime middleware
app.use(reqLogger);
app.use(resTime);

// static to display pages on the public folder
// app.use(express.static(path.join(__dirname, "..", "public")));

// Routes
app.use("/api/games", games);

//Error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
