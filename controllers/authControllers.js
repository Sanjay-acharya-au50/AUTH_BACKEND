const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register
const registerUser = async (req, res) => {
  const { name, email, password, profession } = req.body;

  try {
    // name check
    if (!name || !email || !password || !profession) {
      return res.json({ error: "Empty field" });
    }
    // password check
    else if (password < 6) {
      return res.json({
        error: "Password is required and it shold b more thn 6 char length",
      });
    }

    const exist = await User.findOne({ email });
     if (exist) {
      return res.json({ error: "Email already taken" });
    }


    const salt = await bcrypt.genSalt(10);
    let hashed_password = await bcrypt.hash(password.toString(), salt);
    // email check

    const user = await User.create({
      name,
      profession,
      email,
      password: hashed_password,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password) {
      return res.json({ error: "Empty field" });
    }

    // check user exist
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.json({ error: "You are not registered" });
    }
    let db_password = user.password;
    //matching password
    const isValid = await bcrypt.compare(password.toString(), db_password);

    //taking action for incorrect password
    if (!isValid) {
      // return res.send("Incorrect Password")
      return res.json({ error: "password do not match" });
    }

    //generate token
    // const token_to_send = jwt.sign({ id: user._id }, "mySecretKey", { expiresIn: '1h' })

    const jwtSign = await jwt.sign({ id: user._id , name:user.name , profession:user.profession }, "mySecretKey");
    res.cookie("newtoken",jwtSign, {
      secure: true,
      // httpOnly: true,
    } );

    res.json(jwtSign)
    console.log(jwtSign,"jwtSign line 84")
    // ---------------
  } catch (error) {
    console.log(error);
  }
  // ----------------
};
// app.use(cookiesParser());
// app.use(express.urlencoded({extended:false}))

const getProfile = (req, res) => {
  const { newtoken } = req.cookies;
  console.log("req:",req.cookies);
  try {
    const jwtVerify = jwt.verify(newtoken, "mySecretKey" );
     res.json(jwtVerify);
     console.log("verify:",jwtVerify);
    
  } catch (error) {
  console.log("token from eroor: ", error);
    
  }

};


const logout = (req,res)=> {
    res.clearCookie('newtoken').json({message:"logout suc"})
}

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logout
};
