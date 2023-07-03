const express = require("express");
const mongoose = require("mongoose");
const cookiesParser = require("cookie-parser");
const cors= require("cors")
const dotenv = require("dotenv").config()

const app = express();
// middleware

app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: false }));

// https://sanjay-mern-authentication.vercel.app
app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}))

// database connection
const DB = process.env.MONGO_KEY
mongoose
  .connect(
    DB
  )
  .then(() => console.log("Data Base connected"))
  .catch((err) => console.log("DataBase failed", err));

app.use("/", require("./routes/authRoutes"));
app.listen(8000, () => {
  console.log("server loading : 8000");
});
