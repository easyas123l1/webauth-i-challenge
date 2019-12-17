module.exports = function restricted(req, res, next) {
  if (req.sesion && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You Shall Not Pass!!" });
  }
};
