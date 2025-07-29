const express = require("express");
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});
