const express = require("express");
const app = express();
const dotenv = require('dotenv');
const { connectDatabase } = require("./database.js");
const { authRouter } = require("./src/routes/auth.js")

const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use("/", authRouter);

app.get("/myMusic/test", (req, res) => {
  res.status(200).send({ message: "hello" });
});

app.listen(PORT, () => {
  (async () => {
    await connectDatabase();
    console.log("Listening on PORT: ", PORT);
  })();
});
