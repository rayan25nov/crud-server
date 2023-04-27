require("dotenv").config();
const port = process.env.PORT || 8000;

const app = require("./middleware/middleware");
app.get("/", (req, res) => {
  res.send("<h1>Working on backend</h1>");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
