const nodemailer = require("nodemailer");
const { nodemailerEmail, nodemailerPassword } = process.env;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: nodemailerEmail,
    pass: nodemailerPassword,
  },
});

async function sendEmail(info) {
  transporter.sendMail(info, function (error, response) {
    if (error) {
      return console.log(error);
    }
    console.log(response);
  });
}

module.exports = {
  sendEmail,
};
