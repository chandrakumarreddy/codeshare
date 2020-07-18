const mongoose = require("mongoose");

const { mongoURL } = process.env;

module.exports = {
  async connect() {
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      console.log("connected to database");
    } catch (error) {
      console.log(error);
    }
  },
};
