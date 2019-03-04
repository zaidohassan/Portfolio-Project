require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const { isbnLookUp } = require("./controllers/getBookInfo/getBookInfo");
const {
  addBook,
  rejectBookCount,
  getBookCount
} = require("./controllers/db_controllers/addBook");
const {
  getBooks,
  didMount
} = require("./controllers/db_controllers/getBookbyDate");
const { register } = require("./controllers/userControllers/register");
const {
  login,
  logout,
  verifyLogin
} = require("./controllers/userControllers/login");
const { deleteBook } = require("./controllers/db_controllers/deleteBook");
const { editUser } = require("./controllers/userControllers/editUser");
const { bookChart } = require("./controllers/db_controllers/bookChart");

app.use(json());
app.use(express.static(`${__dirname}/../build`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

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

// Get Isbn when inputted or add a book when accepted
app.get("/api/dashboard/:id", isbnLookUp);
app.post("/api/addBook", addBook);

// Add Reject Count to database and also get number of accepted books
app.post("/api/addtoTotalBook", rejectBookCount);
app.post("/api/getBookCount", getBookCount);

// Inventory

app.post("/api/getTodaysBooks", didMount);
app.post("/api/getBook", getBooks);
app.delete("/api/deleteInventory/:id", deleteBook);

// ChartJS

app.post("/api/getChartBook", bookChart);

// get User Info / Create Users / Edit Users
app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/verifylogin", verifyLogin);
app.put("/auth/editUser/:id", editUser);

// logout

app.get("/auth/logout", logout);

app.listen(port, () => console.log(`Listening on ${port}`));
