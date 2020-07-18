const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
};

module.exports = { isAuthenticated };
