var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	;

var Schema = {
			name: { type: String, required: true }
		, professor_id: { type: Schema.Types.ObjectId, ref: 'Professor', required: true }
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
				student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true }
			, answers: [{ type: Number, required: true }]
			, time_spent: { type: Number, required: true }

			}]
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
