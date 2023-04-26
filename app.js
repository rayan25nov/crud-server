const express = require("express");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Working on backend</h1>");
});

app.listen(port, "localhost");
