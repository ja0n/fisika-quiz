var express = require('express');
var db = require('../scripts/db');

var Router = express.Router();
var collection = db.collection('conf');

Router.get('/tags', function (req, res) {
	collection.findOne({ name: 'tags'}, function(err, data) {
		if(err) throw err;
		if(data) res.json(data);
	});
});

module.exports = Router;
