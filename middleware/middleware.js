const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Use body-parser middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("../routes/route");
app.use("/user", userRoutes);

module.exports = app;
