const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/temple_management_system").then(()=>{ 
    console.log("Connected Database : temple_management_system");
}).catch((e)=>{ 
    console.log(e);
    console.log("Connection With temple_management_system Database Unsuccessfull");
});
