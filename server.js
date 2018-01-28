// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
const logger = require("morgan");
const bluebird = require('bluebird');
var mongoose = require("mongoose");

// Require schema
const Article = require("./models/Article");

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydatabase");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------
app.get("/api/saved", function(req, res) {
    Article.find({}, function(error, doc) {
        if(error) {
            console.log(error)
        } else {
            res.json(doc)
        }
    });
});

app.post("/api/saved", function(req, res) {
    var newArticle = new Article({
        title:req.body.title,
        link:req.body.link,
        date:req.body.date
    });
    newArticle.save(function(error, doc) {
        if (error) {
            console.log(error)
        } else {
            res.send(doc)
        }
    });
});

app.delete("/api/saved/:id", function(req, res) {
    Article.find({_id: req.params.id}).remove(function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.send({result: "success"})}
    });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});