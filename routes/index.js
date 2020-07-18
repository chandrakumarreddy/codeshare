const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const { getError, hasError } = require("../utils/errors");
const { sendEmail } = require("../helpers/nodemailer");

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
      const mailOptions = {
        from: `"Customer" <${email}>`, // sender address
        to: "keka1642@gmail.com", // list of receivers
        subject: "Customer questions✔", // Subject line
        text: message, // plain text body
      };
      sendEmail(mailOptions).then(() => {
        return res.render("thankyou", { title: "Thank You | CodeShare" });
      });
    }
  );

module.exports = router;
