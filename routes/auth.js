var express = require("express");
var router = express.Router();

/* USER Login. */
router
  .route("/login")
  .get(function (req, res) {
    res.render("auth/login", { title: "Login | CodeShare" });
  })
  .post((req, res) => {
    res.send("hi");
  });

/* Register Login. */
router
  .route("/register")
  .get(function (req, res) {
    res.render("auth/register", { title: "Register | CodeShare" });
  })
  .post((req, res) => {
    res.send("hi");
  });

module.exports = router;
