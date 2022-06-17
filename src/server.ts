import express, { Application, Request, Response, NextFunction } from "express";
require("express-async-errors");
const app: Application = require("./app");

const start = async () => {
  try {
    app.listen(process.env.PORT || 8080, () =>
      console.log("DB connected, server is running")
    );
  } catch (error) {
    console.log(error);
  }
};
start();
