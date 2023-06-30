const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    profession: String,
    email: {
        type : String,
        unique : true
    },
    password : String
})

const UserModel = mongoose.model("user", userSchema)

module.exports = UserModel;