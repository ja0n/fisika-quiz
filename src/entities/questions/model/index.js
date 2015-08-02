var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, _schema = require('../schema')
	, modelName = 'Question'
	, collectionName = 'questions'
	;

module.exports = mongoose.model(modelName, _schema, collectionName);
