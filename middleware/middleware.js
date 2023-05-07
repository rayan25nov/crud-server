const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

//Using cors for cross origin resourse sharing
app.use(cors({ origin: "*" }));

// Use body-parser middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// All of the request [get, post, patch, delete] from routes folder
const authRoutes = require("../routes/auth");
// Routes for middleware
app.use("/users", authRoutes);

//Route for crud operation
const dataRoutes = require("../routes/route");
app.use("/data", dataRoutes);

module.exports = app;
