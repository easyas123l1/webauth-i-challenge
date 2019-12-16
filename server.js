const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const ApiRouter = require("./api/api-router.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan("tiny"));

server.use("/api", ApiRouter);

server.use("/", (req, res) => {
  res.status(200).json("server is running!");
});

module.exports = server;
