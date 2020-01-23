// Dependencies
// -----------------------------------------
var express = require("express");
var path = require("path");

// To set up Express App
// -----------------------------------------
var app = express();
var PORT = process.env.PORT || 3000; // use Heroku port or localhost:3000

// To set up Express app to handle data parsing
// -----------------------------------------
app.use("/assets", express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Required Routes
// -----------------------------------------
require("./app/routes/apiRoutes")(app);
require("./app/routes/htmlRoutes")(app);

// Start the server to begin listening
// -----------------------------------------
app.listen(PORT, function(){
    console.log("App listening on PORT" + PORT);
});