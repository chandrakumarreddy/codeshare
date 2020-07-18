const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = async function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, this.salt, 100, 10, "sha256", (err, hash) => {
      if (err) {
        return console.log(err);
        reject(err);
      }
      this.hash = hash.toString("hex");
      return resolve();
    });
  });
};

UserSchema.methods.validPassword = async function (password) {
  crypto.pbkdf2(password, this.salt, 100, 10, "sha256", (err, hash) => {
    if (err) {
      console.log(err);
      return false;
    }
    return hash.toString("hex") === this.hash;
  });
};

module.exports = mongoose.model("User", UserSchema);
