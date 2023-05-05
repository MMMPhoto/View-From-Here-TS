const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://db:27017/view-from-here",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
