const db = require("./db");
const Fave = require("./models/Fave");
const Curr = require("./models/Curr");

// require('dotenv').config(); may need for my Yelp API key

module.exports = {
	// Include your models in this exports object as well!
	db,
	models: {
		Fave,
		Curr,
	},
};

