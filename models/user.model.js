const mongoose = require("../config/db");

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  ip_address: String,
  country: String,
});

const Crud = mongoose.model("Crud", userSchema);

module.exports = Crud;
