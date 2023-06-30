const express = require("express");
const mongoose = require("mongoose");
const cookiesParser = require("cookie-parser");
var cookies = require("cookie-parser");

const app = express();
// middleware

app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: false }));
app.use(cookies());

// database connection

mongoose
  .connect(
    "mongodb+srv://sanjayacharya992:san123@cluster0.mxxhhgc.mongodb.net/myDB"
  )
  .then(() => console.log("Data Base connected"))
  .catch((err) => console.log("DataBase failed", err));

app.use("/", require("./routes/authRoutes"));
app.listen(8000, () => {
  console.log("server loading : 8000");
});
