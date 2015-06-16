var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	;

var Schema = {
			name: { type: String, required: true }
		,	role: { type: String, required: true }
		,	email: { type: String, required: true }
		,	salt: { type: String, required: true }
		,	hash: { type: String, required: true }
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
