// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; //use heroku port or localhost:3000

// Sets up the Express app to handle data parsing
app.use("/assets", express.static('assets'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Required Routes
// =============================================================
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });