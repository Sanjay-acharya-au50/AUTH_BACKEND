const express = require("express");
const {mongoose} = require("mongoose");
//  cookies parse
const cookiesParser = require('cookie-parser');


const app = express();


// database connection

mongoose.connect("mongodb+srv://sanjayacharya992:san123@cluster0.mxxhhgc.mongodb.net/myDB")
.then(()=>console.log("Data Base connected"))
.catch((err)=>console.log("DataBase failed",err))

// middleware
app.use(express.json());
// after cookies parse
app.use(cookiesParser());
app.use(express.urlencoded({extended:false}))


app.use("/", require('./routes/authRoutes'))



app.listen(8000, ()=>{
    console.log("server loading : 8000");
})