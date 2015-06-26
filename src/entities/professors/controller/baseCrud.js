var Model = require('./../model')
	, Controller = {}
	, ROLE = 'professor'
	;
Controller.create = function (req, res) {
	var data = req.body;
	data.role = ROLE;

	var model = new Model(data);

	model.save(function(err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json({ success: true });
	});
};

Controller.retrieveAll = function (req, res) {
	var query = { role: ROLE };

	Model.find(query, { hash: 0, salt: 0 }, function(err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data);
	});
};

Controller.removeAll = function(req, res) {
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { role: ROLE, institution_id: req_institution_id };

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
	var query = { role: ROLE, _id: id };

	Model.findOne(query, { hash: 0, salt: 0, institution_id: 0 }, function (err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data || { err: true });
	});
};

Controller.modifyById = function (req, res) {
	var id = req.params.id;
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { role: ROLE, _id: id };

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
	var query = { role: ROLE, _id: id };

	Model.findOneAndRemove(query, { select: { hash: 0, salt: 0, institution_id: 0 } }, function (err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data ? { success: true, data: data } : { err: true });
	});
};

module.exports = Controller;
