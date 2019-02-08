require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const { isbnLookUp } = require("./controllers/getBookInfo");
app.use(json());
const port = 3005;

app.get("/api/dashboard/:id", isbnLookUp);

app.listen(port, () => console.log(`Listening on ${port}`));
