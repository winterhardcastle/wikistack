const wikiPage = require("./routes/wiki");
const usersPage = require("./routes/users");
const express = require("express");
const morgan = require("morgan");
const pages = require("./views/main.js");
const app = express();

const { db, Page, Users } = require("./models/index.js");

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/wiki", wikiPage);

db.authenticate().then(() => {
  console.log("Connected to database");
});

app.get("/", (req, res, next) => {
  try {
    res.redirect("/wiki");
  } catch (error) {
    next(error);
  }
});

const dbSync = async () => {
  await db.sync();
  app.listen("1337", () => {
    console.log("Server running.");
  });
};
dbSync();

// app.listen("1337", () => {
//   console.log("Server running.");
// });
