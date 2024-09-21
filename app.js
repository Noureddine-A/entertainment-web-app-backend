const express = require("express");
const mongoose = require("mongoose");

const app = express();
const bodyParser = require("body-parser");

const authRouter = require("./routes/authRouter");
const entertainmentRouter = require("./routes/entertainmentRouter");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/auth", authRouter);
app.use("/entertainment", entertainmentRouter);

app.use((err, req, res, next) => {
  let error = new Error();
  error.statusCode = 500;
  error.message = "Something went wrong with the server. Try again later.";
  res.status(error.statusCode).json({ message: error.message });
});

mongoose
  .connect(
    "mongodb+srv://anoxybiosis:jGB8XKVJQPbUxHB0@cluster0.0zv6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(8080);
  });
