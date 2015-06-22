var Schema = {
			name: { type: String, required: true }
		, professor_id: { type: String, required: true }
		,	description: { type: String }
		, questions: [{
				description: { type: String, required: true }
			, 
			}]
		,	submits: [{
				student_id: { type: Number, required: true }
			, time_spent: { type: Number, required: true }
			}]
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
