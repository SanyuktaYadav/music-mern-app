const express = require("express");
const app = express();
const dotenv = require('dotenv');
const { connectDatabase } = require("./database.js")

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  (async () => {
    await connectDatabase();
    console.log("Listening on PORT: ", PORT);
  })();
});
