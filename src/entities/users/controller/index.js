var Model = require('./../model')
	, Controller = {}
	;

Controller.create = function(req, res) {
	console.log(req.body);
	var model = new Model(req.body);

	model.save(function(err, data) {
		if(err) {
			console.log('ERRO: ', err);
			res.send(err);
		}
		res.json(data);
	});
};

// Função de listagem por isso a query é sempre {}
Controller.retrieveAll = function(req, res) {
	var query = {};
	Model.find(query, function(err, data) {
		if(err) {
			console.log('ERRO: ', err);
			res.send(err);
		}
		res.json(data);
	});
};

Controller.retrieveById = function (req, res) {
	var id = req.params.id;
	var req_institution_id = req.session.user._id || req.session.user.institution_id;
	var query = { _id: id, institution_id: req_institution_id };

	Model.findOne(query, { hash: 0, salt: 0, institution_id: 0 }, function (err, data) {
		if(err) {
			console.log('ERROR: ', err);
			res.json({ err: true });
		} else res.json(data || { err: true });
	});
};


module.exports = Controller;
