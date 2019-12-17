// dependencies!
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

// Routes for Router & DB config
const ApiRouter = require("./api/api-router.js");
const knex = require("./data/db-config");

// start server!!
const server = express();

const sessionConfig = {
  name: "secret",
  secret: "keep it secret, keep it safe!",
  saveUninitialized: false,
  resave: false,
  store: new KnexSessionStore({
    knex,
    createtable: true,
    clearInterval: 1000 * 60 * 10, //10 minutes
    sidfieldname: "sid",
    tablename: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 10, //10 minutes
    secure: false, // true in production
    httpOnly: true //JS can't read this.
  }
};

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
