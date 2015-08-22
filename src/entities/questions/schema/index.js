var ObjectId = require('mongoose').Schema.Types.ObjectId;

var Schema = {
			title: { type: String, required: true }
		, answer: { type: Number, required: true }
		,	description: { type: String, required: true }
		,	alternatives: [{
				description: { type: String, required: true }
			}]
		, tags: [{ type: String }]
		,	submissions: [{
				student: { type: ObjectId, ref: 'Student', required: true }
			, answer: { type: Number, required: true }
			, time_spent: { type: Number, required: true }
			}]
		, created_by: { type: ObjectId, ref: 'Professor', required: true }
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
