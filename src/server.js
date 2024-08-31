// Importing necessary files
require("./database/db_connection"); // Database connection file

// Importing db models
const vazhipadu_model = require('./models/vazhipadu_model');
const user_model = require('./models/user_model')

// Importing dependencies
const express = require("express");
const app = express();
const hbs = require("hbs");
const body_parser = require("body-parser");
const path = require("path");

const port = 3000; // Port number for the application
app.use(body_parser.urlencoded({ extended: true }));

// Configuring paths to necessary folders
app.use(express.static(path.join(__dirname, '../templates/public')));
const views_path = path.join(__dirname,"../templates/views"); // Path to the view folder
app.set("view engine","hbs"); // Setting View Engine
app.set("views",views_path); // Setting path to views folder
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

// Registering helpers for handlebars
hbs.registerHelper('increment', function(index) {
    return index + 1;
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

hbs.registerHelper('reverseIndex', function(array, index) {
    return array.length - index;
});

// Registering all the necessary routes
const pooja_route = require('./routes/pooja_routes');
app.use('/pooja',pooja_route);

const user_route = require('./routes/user_routes');
app.use('/user',user_route);

app.use('/',(req,res)=>{res.render('login')});

app.listen(port,()=>{
    console.log("Temple Management System Server running at port : "+port);
});