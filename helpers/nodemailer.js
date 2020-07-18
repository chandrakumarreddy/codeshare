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
  return new Promise((resolve, reject) => {
    transporter.sendMail(info, function (error, response) {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
}

module.exports = {
  sendEmail,
};
