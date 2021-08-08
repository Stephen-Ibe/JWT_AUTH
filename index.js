const express = require("express");
require("dotenv/config");

// Express Config
const app = express();

// Define PORT and start server
const port = process.env.PORT || 4001;

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log("App lsitening to port 4000");
});
