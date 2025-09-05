const express = require("express");
const app = express();
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const { connectDatabase } = require("./database.js");
const { authRouter } = require("./src/routes/auth.js");
const { songRouter } = require("./src/routes/song.js");
const { userRouter } = require("./src/routes/user.js");
const { songHistoryRouter } = require("./src/routes/songHistory.js");

const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", songRouter);
app.use("/", songHistoryRouter);

app.get("/myMusic/test", (req, res) => {
  res.status(200).send({ message: "hello" });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.listen(PORT, () => {
  (async () => {
    await connectDatabase();
    console.log("Listening on PORT: ", PORT);
  })();
});
