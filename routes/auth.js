const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const User = require("../models/user");
const { hasError, getError } = require("../utils/errors");

/* USER Login. */
router
  .route("/login")
  .get(function (req, res) {
    return res.render("auth/login", { title: "Login | CodeShare" });
  })
  .post((req, res, next) => {
    passport.authenticate("local", function (err, user) {
      if (err) {
        return res.redirect("/login");
      }
      req.logIn(user, function () {
        return res.redirect("/");
      });
    })(req, res, next);
  });

/* Register Login. */
router
  .route("/register")
  .get(function (req, res) {
    res.render("auth/register", {
      title: "Register | CodeShare",
      errors: [],
      hasError,
      getError,
    });
  })
  .post(
    [
      body("name", "Please Enter a valid name").isLength({ min: 4 }),
      body("email", "Please Enter a valid Email address").isEmail(),
      body("password", "Please enter a valid password").isLength({
        min: 6,
      }),
      body("confirmPassword", "Please enter a valid confrim password").isLength(
        {
          min: 5,
        }
      ),
    ],
    async (req, res) => {
      const { name, email, password, confirmPassword } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("auth/register", {
          title: "Register | CodeShare",
          name,
          email,
          password,
          confirmPassword,
          errors: errors.array(),
          hasError,
          getError,
        });
      }
      const user = new User({
        name,
        email,
      });
      await user.setPassword(password);
      try {
        await user.save();
        res.redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
  );

router.get("/signout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
