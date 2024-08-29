// Importing necessary files
require("./database/db_connection"); // Database connection file

// Importing db models
const vazhipadu_model = require('./models/vazhipadu_model');

// Importing dependencies
const express = require("express");
const app = express();
const hbs = require("hbs");
const body_parser = require("body-parser");
const path = require("path");

const port = 3000; // Port number for the application
app.use(body_parser.urlencoded({ extended: true }));

// Configuring paths to necessary folders
const views_path = path.join(__dirname,"../templates/views"); // Path to the view folder
app.set("view engine","hbs"); // Setting View Engine
app.set("views",views_path); // Setting path to views folder
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

hbs.registerHelper('increment', function(index) {
    return index + 1;
});

const pooja_route = require('./routes/pooja_routes');
app.use('/pooja',pooja_route);


// app.get('/get-rate/:vazhipadu1', async (req, res) => {
//     console.log("Rate");
//     const vazhipadu1 = req.params.vazhipadu1;
//     try {
//         const pooja = await available_vazhipadu.findOne({ vazhipadu: vazhipadu1 });
//         if (pooja) {
//             res.json({ rate: pooja.rate });
//         } else {
//             res.json({ rate: null });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


app.listen(port,()=>{
    console.log("Temple Management System Server running at port : "+port);
});