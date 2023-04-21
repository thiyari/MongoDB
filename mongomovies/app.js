var express = require("express");
var bodypParser = require("body-parser");
var mongoose = require("mongoose");

var routes = require("./routes/index");
var movies = require("./routes/movies");

var app = express();

app.use(bodypParser.json());

app.use("/",routes);
app.use("/api/v1/movies", movies);

app.listen(3000,function(){
	console.log('Server Running on Port 3000...')
});