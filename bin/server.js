require("dotenv").config();
const express = require("express");
const app = express();

app.use((req, res, next) => {
  next();
});

console.log(process.env.API_PORT);
const port = process.env.API_PORT || 5000;

app.get('/', (req, res) => {
  res.send("<h1>API - CHAT</h1>");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});