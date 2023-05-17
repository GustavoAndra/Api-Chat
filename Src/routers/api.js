var express = require("express");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).send("<h1>API - CHAT</h1>");
});

app.use('/', router);