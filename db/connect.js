const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  return mongoose.connect(url);
};

module.exports = connectDB;
