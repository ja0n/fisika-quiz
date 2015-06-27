var Model = require('./../model')
	, Controller = {}
	;

var ObjectId = require('mongoose').Types.ObjectId;

Controller.create = function (req, res) {
	var data = req.body;
	data['professor'] = new ObjectId(req.session.user._id);

	var model = new Model(data);

	model.save(function(err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json({ success: true });
	});
};

Controller.retrieveAll = function (req, res) {
	var query = { };

	Model.find(query, { hash: 0, salt: 0 }).populate('professor', '-hash -salt').exec(function(err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data);
	});
};

Controller.removeAll = function(req, res) {
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { institution_id: req_institution_id };

	Model.remove(query, function(err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data);
	});
};

Controller.retrieveById = function (req, res) {
	var id = req.params.id;
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { _id: id };

	Model.findOne(query, { hash: 0, salt: 0, institution_id: 0 })
							 .populate('professor submissions.student', '-salt -hash')
							 .exec(function (err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else {
			if(!req.session.user.quizzesTime) req.session.user.quizzesTime = {};
			req.session.user.quizzesTime[data._id] = Date.now();
			res.json(data || { err: true });
		}
	});
};

Controller.submitById = function (req, res) {
	var id = req.params.id;
	var submission = req.body.submission;
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { _id: id };

	Model.findOne(query, function (err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else {
			if(!data || !req.session.user.quizzesTime[id]) res.json({ err: true });

			data.submissions.push({
				student: new ObjectId(req.session.user._id),
				answers: submission,
				time_spent: Date.now() - req.session.user.quizzesTime[id]
			});

			delete req.session.user.quizzesTime[id];
			data.save(function(err) {
				if(err) res.json({ err: err });
				else    res.json({ success: true });
			});
			// Model.update(query, { $set: { submissions: data.submissions }}, { upsert: true });
			//res.json({ err: false, success: true });

		}
	});
};

Controller.modifyById = function (req, res) {
	var id = req.params.id;
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { _id: id };

	Model.findOneAndUpdate(query, req.body, { select: { hash: 0, salt: 0, institution_id: 0 } }, function(err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data ? { success: true, data: data } : { err: true });
	});
};

Controller.removeById = function (req, res) {
	var id = req.params.id;
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { _id: id };

	Model.findOneAndRemove(query, { select: { hash: 0, salt: 0, institution_id: 0 } }, function (err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data ? { success: true, data: data } : { err: true });
	});
};

module.exports = Controller;
