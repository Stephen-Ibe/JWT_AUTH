const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// env
const { PORT, DB_CONNECTION } = process.env;

const db = DB_CONNECTION;
const port = PORT || 3000;

// console.log(db);

// Import Routes
const authRoute = require("./routes/auth");

// Middlewares
app.use("/api/auth", authRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome Home !!!");
});

// DB Connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connection successful"))
  .catch(() => console.log("DB Connection error!!!"));

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log("App lsitening to port 3000");
});
