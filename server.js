const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const sessions = require('express-session');

const ApiRouter = require("./api/api-router.js");

const server = express();

const sessionConfiguration = {
  name: 'secret',
  secret: 'keep it secret, keep it safe!', 
  saveUninitialized: false,
  resave: false,
  store: ,
  cookie: {
    maxAge: 1000 * 60 * 10, //10 minutes
    secure: false, // true in production
    httpOnly: true //JS can't read this.
  }
}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("tiny"));
server.use(session(sessionConfig));

server.use("/api", ApiRouter);

server.use("/", (req, res) => {
  res.status(200).json("server is running!");
});

module.exports = server;
