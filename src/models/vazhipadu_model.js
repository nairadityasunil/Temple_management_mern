const mongoose = require("mongoose");

const tbl_vazhipadu = new mongoose.Schema({
    vazhipadu_name : {
        type:String,
        required:true
    },
    rate : {
        type:String,
        required:true
    },
    devotee_name :{
        type:String,
        required:true
    },
    birth_star :{
        type:String,
        required:true
    },
    pooja_date :{
        type:String,
        required:true
    },
    created_at :{
        type:Date,
        required:true
    },
    updated_at :{
        type:Date,
        required:true
    },
});

const vazhipadu_record = new mongoose.model("tbl_vazhipadu",tbl_vazhipadu);
module.exports = vazhipadu_record;