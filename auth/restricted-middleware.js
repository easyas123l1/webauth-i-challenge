const bcrypt = require("bcryptjs");
const Users = require("../api/api-model");

module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findBy(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials Login" });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ message: "server crashed while trying to login" });
      });
  } else {
    res.status(401).json({ message: "Please Provide Valid Credentails" });
  }
};
