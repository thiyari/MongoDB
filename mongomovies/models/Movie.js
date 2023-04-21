var mongoose = require("mongoose");

// Movie Schema
var MovieSchema = mongoose.Schema({
	title: {
		type: String
	},
	plot: {
		type: String
	},
	cover: {
		type: String
	},
	genre: {
		type: String
	},
	actors: {
		type: Array
	},
	releaseDate: {
		type: Date
	}
});

module.exports = mongoose.model('Movie',MovieSchema);


