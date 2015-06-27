var mongoose = require('mongoose');

module.exports = function(dbURI) {
	var db = mongoose.connection;

	mongoose.connect(dbURI);

	db.on('error', function(err){
			console.log('Erro de conexao.', err)
	});
	db.on('open', function () {
		console.log('Conexão aberta.')
	});
	db.on('connected', function(err){
		console.log('Conectado')
	});
	db.on('disconnected', function(err){
		console.log('Desconectado')
	});

	process.on('SIGINT', function() {
		db.close(function () {
			console.log('Conexão com o Mongoose fechada');
			process.exit(0);
		});
	});

	return db;
};
