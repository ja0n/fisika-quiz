var Schema = {
			name: { type: String, required: true }
		, professor_id: { type: String, required: true }
		,	description: { type: String }
		,	coords: {
			 	lat: { type: Number, required: true }
			,	lng: { type: Number, required: true }
			}
		, created_at: { type: Date, default: Date.now }
		, updated_at: { type: Date, default: Date.now }
		}
	;

module.exports = Schema;
