const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

//Using cors for cross origin resourse sharing
app.use(cors());

// Use body-parser middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("../routes/route");
app.use("/user", userRoutes);

module.exports = app;
