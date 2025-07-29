const express = require("express");
const app = express();
const port = 1000;

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});
