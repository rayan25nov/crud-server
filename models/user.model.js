const mongoose = require("../config/db");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  ip_address: String,
  country: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
