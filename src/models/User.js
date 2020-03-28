const db = require("mongoose");

const user = db.Schema({
  _id: db.Schema.Types.ObjectId,
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  userName: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String, require: true }
});

module.exports = db.model("User", user);
