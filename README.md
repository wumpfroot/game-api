# game-api

Basic implementation of an Express.js (Node.js framework) API. Coded using TypeScript.

## Install

    npm install

Installs the necessary packages

## Run the server

    npm run dev

This runs the server, monitors for changes, and uses TypeScript Compiler (TSC) to compile TypeScript code into JavaScript, which it then executes.

# API

## GET all games

### Request

`GET api/games/`

    curl http://localhost:8080/api/games

Filter by minimum metascore

    curl http://localhost:8080/api/games?minmetascore=70

## GET a single game by ID

### Request

`GET api/games/:id`

    curl http://localhost:8080/api/games/3

## Add (POST) a new game

### Request

`POST api/games/`

    curl http://localhost:8080/api/games/3

#### Body

`(JSON):`

```{
    "title": "Awesome Game",
    "developer": "Amazing Devs",
    "metascore": 99
}
```

`(Form-encode):`

```title: Awesome Game
developer: Amazing Devs,
metascore: 99
```

## Update (PUT) a game by ID

### Request

`PUT api/games/:id`

    curl http://localhost:8080/api/games/3

Update a field/s of a single game. Fields in the request body will be changed, untouched will not.

## DELETE a single game by ID

### Request

`DELETE api/games/:id`

    curl http://localhost:8080/api/games/3

Easy. Deletes the game with the matching id. This removes a game with an id of 3.
