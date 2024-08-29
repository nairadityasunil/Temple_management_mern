const mongoose = require("mongoose");

const available_vazhipadu = new mongoose.Schema({
    vazhipadu:{
        type:String,
        required:true,
        unique:true
    },
    rate :{
        type:Number,
        required:true,
    }
});

const all_vazhipadu = new mongoose.model("all_vazhipadus",available_vazhipadu);
module.exports = all_vazhipadu;