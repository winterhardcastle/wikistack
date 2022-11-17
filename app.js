const express = require("express");
const morgan = require("morgan");
const pages = require("./views/main.js");
const app = express();
const db = require("./models/index.js");

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

db.db.authenticate().then(() => {
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  res.send(pages(""));
});

app.listen("1337", () => {
  console.log("Server running.");
});
