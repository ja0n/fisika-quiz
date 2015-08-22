var ObjectId = require('mongoose').Schema.Types.ObjectId;

var Schema = {
			name: { type: String, required: true }
		,	description: { type: String }
		, questions: [{ type: ObjectId, ref: 'Question' }]
		,	submissions: [{
				student: { type: ObjectId, ref: 'Student', required: true }
			, answers: [{ type: Number, required: true }]
			// , time_spent: { type: Number, required: true }
			}]
		, created_by: { type: ObjectId, ref: 'Professor', required: true }
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
