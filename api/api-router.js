const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./api-model.js");
const restricted = require("../auth/restricted-middleware");

const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error while adding user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials Login" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "server crashed while trying to login" });
    });
});
``;
// get all users restricted!
router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "failed to get users" });
    });
});

router.post("/register", (req, res) => {});

module.exports = router;
