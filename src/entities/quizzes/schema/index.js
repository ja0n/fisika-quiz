var ObjectId = require('mongoose').Schema.Types.ObjectId;

var Schema = {
			name: { type: String, required: true }
		, professor: { type: ObjectId, ref: 'Professor', required: true }
		,	description: { type: String }
		, questions: [{
				title: { type: String, required: true }
			, answer: { type: Number, required: true }
			,	description: { type: String, required: true }
			,	alternatives: [{
					description: { type: String, required: true }
				}]
			}]
		,	submissions: [{
				student: { type: ObjectId, ref: 'Student', required: true }
			, answers: [{ type: Number, required: true }]
			, time_spent: { type: Number, required: true }

			}]
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
