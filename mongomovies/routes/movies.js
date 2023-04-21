var express = require("express")
var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/mongomovies');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'Connection Error:'));
db.once('open',function(){
	console.log('MongoDB Connected');
});

var Movie = require('../models/Movie');

router.get("/", function(req,res,next){
	Movie.find().limit(10).then(function(err,movies){
		if(err){
			res.send(err);
		} else {
			res.json(movies);
		}
	});
});

// Single Movie
router.get('/:id',function(req,res,next){
	Movie.findById([req.params.id]).then(function(err,movie){
		if(err){
			res.send(err)
		} else {
			res.json(movie)
		}
	});
});

module.exports = router;

// Add Movie
router.post('/',function(req,res,next){
	var movie = req.body;
	var newMovie = new Movie(movie);
	/*
	var newMovie = new Movie({
		title: 'The Accountant',
		description: 'As a math savant uncooks the books for a new client, the Treasury Department closes in on his activites and the body count starts to rise.',
		cover: 'https://m.media-amazon.com/images/I/91dAIcmOjAL._SL1500_.jpg',
		genre: 'Drama',
		actors: ['Ben Affleck'],
	}); */

	newMovie.save().then(function(err, movie){
		if(err){
			res.send(err);
		} else {
			res.json(movie);
		}
	});
});

// Update Movie
router.put('/:id',function(req,res,next){
	var query = {_id:[req.params.id]};
	var body = req.body;
	Movie.updateOne(query,{$set:body}).then(function(err,movie){
		if(err){
			res.send(err);
		} else {
			res.json(movie);
		}
	});
});

// Delete Movie
router.delete('/:id',function(req,res,next){
	var query = {_id: [req.params.id]};
	Movie.deleteOne(query).then(function(err){
		if(err){
			res.send(err);
		} else {
			res.json({
				msg: "Success"
			});
		}
	});
});