var Controller = require('./../controller');

/**
 * if the route (verb) has not controller, set it to null
 */

var routes = {
  '/': {
    get: Controller.retrieveAll
  , post: Controller.create
	, put: null
	, delete: null
  },
  '/:id':  {
    get: Controller.retrieveById
  , post: null
  , put: null
  , delete: null
  }
};

module.exports = routes;
