const db = require("../data/db-config");

module.exports = {
  getUsers,
  getUserId,
  addUser,
  findBy
};

function getUsers() {
  return db("users");
}

function getUserId(id) {
  return db("users")
    .where("id", "=", id)
    .first();
}

function addUser(data) {
  return db("users")
    .insert(data, "id")
    .then(ids => {
      const [id] = ids;

      return getUserId(id);
    });
}

function findBy(username) {
  return db("users")
    .where("username", "=", username)
    .first();
}
