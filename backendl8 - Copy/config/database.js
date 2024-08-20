const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect("db_url", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("db ka connection successfull"))
    .catch((error) => {
      console.error(error);
      console.log("db ka connection failed");
      process.exit(1);
    });
};
