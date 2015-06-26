var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, _schema = require('../schema')
	, modelName = 'Quizz'
	, collectionName = 'quizzes'
	;

module.exports = mongoose.model(modelName, _schema, collectionName);
