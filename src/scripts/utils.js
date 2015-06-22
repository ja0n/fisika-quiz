"use strict"
var path = require('path')
  , fs = require('fs')
  , express = require('express')
  , pwd = require('./pwd')
  , config = require('../config')
  ;

module.exports = {
  loadEntities: function(app, rootRoute) {
    var paths = this.getDirectories('src/entities');
    paths.forEach(function(path) {
      var routes = require('../entities/' + path + '/routes');
      for (var route in routes) {
        var fullPath = [rootRoute, '/', path, route].join(''), controllers = routes[route];
        if(controllers.get) app.get(fullPath, controllers.get);
        if(controllers.post) app.post(fullPath, controllers.post);
        if(controllers.put) app.put(fullPath, controllers.put);
        if(controllers.delete) app.delete(fullPath, controllers.delete);
      }
    });
  },
  getDirectories: function(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  },
  cors: function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  },
  createAdmin: function(data, db) {
    if(!db) var db = require('./db')(config.dbURI);
    var collection = db.collection('users');
    pwd.hash(data.password, function(err, salt, hash) {
      if (err) throw err;
      delete data.password;
      data.salt = salt;
      data.hash = hash.toString();
      collection.insert(data, function(err, data) {
        if(err) console.log(err);
        else console.log('success', data);
      });
    });
  },
  authenticate: function (name, pass, db, fn) {
    //if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var collection = db.collection('users');

    collection.findOne({ email: name }, function(err, user) {
      if (err) throw err;
      if (!user) return fn(new Error('cannot find user'));

      pwd.hash(pass, user.salt, function(err, hash){
        if (err) return fn(err);
        if (hash.toString() == user.hash) return fn(null, user);
        else return fn(new Error('invalid password'));
      });
    });
  }

};
