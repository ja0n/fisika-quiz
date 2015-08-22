"use strict"
var express = require('express')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , config = require('./config')
  , utils = require('./scripts/utils')
  ;

var app = express();
// var RedisStore = require('connect-redis')(session);
/*
 * Port, settings, Static, session, post body, CORS
 */
app.set('port', config.port || 3000)
   .enable('trust proxy')
   .use(express.static(__dirname + '/../public'))
   .use(bodyParser.urlencoded({ extended: false }))
   .use(bodyParser.json())
   .use(session({ secret: 'qwertyu123', resave: false, saveUninitialized: false }))
   .use(utils.cors)
   ;


var general = require('./general');
app.use('/', general);
utils.loadEntities(app, '/api');
var tags = require('./routes/tags');
app.use('/api', tags);

module.exports = app;
