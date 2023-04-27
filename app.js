const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

// Use body-parser middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/route");
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Working on backend</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
