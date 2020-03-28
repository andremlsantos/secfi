const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://" +
    process.env.MONGO_ATLAS_US +
    ":" +
    process.env.MONGO_ATLAS_PW +
    process.env.MONGO_ATLAS_CONNECTION +
    "?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

console.log("connected to database")

module.exports = mongoose;
