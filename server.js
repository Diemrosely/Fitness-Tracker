//declaring server dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//const seeder = require("./Develop/seeders/seed");

//set port for app
//process.env.PORT is needed to deploy on HEROKU 
let PORT = process.env.PORT || 3000;

let app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true, 
    useFindAndModify: false
});

// Start server to listen to client requests
app.use(require("./routes/api.js"));
app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log("Now listening on port " + PORT);
});