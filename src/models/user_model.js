const mongoose = require("mongoose");

const tbluser = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true,
    }
});

const users = new mongoose.model("users",tbluser);
module.exports = users;