const mongoose = require("../config/db");

const AuthSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Users = mongoose.model("Auth", AuthSchema);

module.exports = Users;
