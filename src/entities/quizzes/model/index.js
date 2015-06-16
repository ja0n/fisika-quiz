var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, _schema = require('../schema')
	, modelName = 'Place'
	, collectionName = 'places'
	;

module.exports = mongoose.model(modelName, _schema, collectionName);
