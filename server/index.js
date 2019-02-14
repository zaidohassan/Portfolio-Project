require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const { isbnLookUp } = require("./controllers/getBookInfo/getBookInfo");
const { addBook } = require("./controllers/db_controllers/addBook");
const { register } = require("./controllers/userControllers/register");
const { login, logout } = require("./controllers/userControllers/login");

app.use(json());
const port = 3005;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

massive(CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
  console.log("Database is Connected");
});

app.get("/api/dashboard/:id", isbnLookUp);
app.post("/api/addBook", addBook);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);
app.listen(port, () => console.log(`Listening on ${port}`));
