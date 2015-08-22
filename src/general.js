var express = require('express')
  , db = require('./scripts/db')
  , pwd = require('./scripts/pwd')
  , utils = require('./scripts/utils')
  , config = require('./config')
  , db = require('./scripts/db')
  , ObjectId = require('mongoose').Schema.Types.ObjectId;
  ;

var Router = express.Router();

Router.use('/api/*', function(req, res, next) {
  delete req.body.hash; delete req.body.salt;
  if (req.session.user) next();
  else {
    res.status(401);
    res.json({ err: 'You Shall Not Pass!!!'});
  }

  return;
  // below code verifies if the incoming requisition has a valid session
  // but its broken. gotta fix it xD
  if(!req.session.user._id) {
    res.status(401);
    res.json({ err: 'login!!!' });
  }
  var collection = db.collection('users');
  var query = { '_id': new ObjectId(req.session.user._id) };

  collection.findOne(query, function(err, user) {
    if (err) throw err;
    if (!user || user.email != req.session.user.email) {
      res.status(401);
      res.json({ err: true, msg: 'invalid session'});
    }
    else {
      delete user.hash; delete user.salt;
      req.session.user = user;
      next();
    }
  });
});

Router.post('/api/(|professors|students)', function(req, res, next) {
  if (req.session.user.role != 'admin')
    return res.json({ err: true, msg: 'You Shall Not Pass!!!'});
  if (!req.body.password)
    res.json({ err: true, msg: 'password required!' });
  else {
    pwd.hash(req.body.password, function(err, salt, hash) {
      if (err) throw err;
      delete req.body.password;
      req.body.salt = salt;
      req.body.hash = hash.toString();
      next();
    });
  }
});

Router.put('/api/(|professors|students)/:id', function(req, res, next) {
  if (req.session.user.role != 'admin' && req.session.user._id != req.params.id)
    return res.json({ err: true, msg: 'You Shall Not Pass!!!'});

  if (!req.body.password)
    next();
  else {
    pwd.hash(req.body.password, function(err, salt, hash) {
      if (err) throw err;
      req.body.salt = salt;
      req.body.hash = hash.toString();
      next();
    });
  }
});

// useless due to above Router.use('/api/*', ...
// Router.all('/api/*', function(req, res, next) {
//   return next();
//   if (req.session.user) next();
//   else {
//     res.status(401);
//     res.json({ err: 'You Shall Not Pass!!!'});
//   }
// });

Router.all('/login', function(req, res) {
  var cred = req.body.email ? req.body : req.query;
  utils.authenticate(cred.email, cred.password, function(err, user) {
    if (err)
      res.send({ err: true });
    if (user) {
      delete user.hash; delete user.salt;
      req.session.user = user;
      res.json({ success: true, user: user });
    }
  });
});

Router.all('/logout', function(req, res) {
  req.session = null;
  res.send('Buh bye! (>^~^)>');
});

module.exports = Router;
