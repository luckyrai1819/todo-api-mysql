import express, { Application, Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
dotenv.config();

const app: Application = express();

const taskRouter = require("./routes/tasks");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const db = require("./db/connect");

app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("welcome to todoapi"));

app.use("/tasks", taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.connect();

module.exports = app;
