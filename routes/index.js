const { body, validationResult } = require("express-validator");
const { getError, hasError } = require("../utils/errors");
const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "CodeShare - Platform to Share code" });
});
/* GET about page */
router.get("/about", (req, res) => {
  res.render("about", { title: "About us | CodeShare" });
});
/* GET/POST contact us */
router
  .route("/contactus")
  .get((req, res) => {
    console.log(getError([], "email"));
    res.render("contactus", {
      title: "Contact Us | CodeShare",
      errors: [],
      getError,
      hasError,
    });
  })
  .post(
    [
      body("email", "Please Enter a valid Email address").isEmail(),
      body("password", "Password should be more than 6 characters").isLength({
        min: 6,
      }),
      body("message", "Message should be more than 6 characters").isLength({
        min: 5,
      }),
    ],
    (req, res) => {
      const { name, email, message } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render("contactus", {
          title: "About us | CodeShare",
          name,
          email,
          message,
          errors: errors.array(),
          getError,
          hasError,
        });
      }
      return res.render("thankyou", { title: "Thank You | CodeShare" });
    }
  );

module.exports = router;
