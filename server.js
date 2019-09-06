// Packages
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// If deployed, use the deployed database.  Otherwise, use the local database:
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://akira108:adom1n@ds311968.mlab.com:11968/heroku_n09d73q8";

// Initialize Express & Call files from 'routes' folder
var app = express();
var routes = require("./routes/routes.js");


// ================== CONFIGURE MIDDLEWARE =====================//
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use routes
app.use(routes);

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));
// app.use(express.static(__dirname + '/public'));

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
