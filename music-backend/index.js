const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const PORT = process.env.PORT || 3000;
const MongoDB_URI = process.env.MongoDB_URI

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  mongoose.connect(MongoDB_URI)
    .then(() => {
      console.log('MongoDB connected')
      console.log("Listening on PORT: ", PORT);
    })
    .catch(err => console.error('MongoDB connection error:', err));
});
