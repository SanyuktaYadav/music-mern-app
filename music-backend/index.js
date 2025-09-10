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

const allowedOrigins = [
  'http://localhost:5173',
  'https://sy-music-frontend.onrender.com',  // Replace with your real frontend URL on Render or elsewhere
  'https://fluffy-space-cod-pwgxwq5gq4vc7w7p-5173.app.github.dev'
];

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }

    return callback(null, true);
  },
  credentials: true
}));

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", songRouter);
app.use("/", songHistoryRouter);

app.get("/myMusic/test", (req, res) => {
  res.status(200).send({ message: "hello" });
});

app.get("/myMusic/ready", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));


app.listen(PORT, () => {
  (async () => {
    await connectDatabase();
    console.log("Listening on PORT: ", PORT);
  })();
});
