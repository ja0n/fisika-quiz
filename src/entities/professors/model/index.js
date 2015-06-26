var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, _schema = require('../schema')
	, modelName = 'Professor'
	, collectionName = 'users'
	;

module.exports = mongoose.model(modelName, _schema, collectionName);
