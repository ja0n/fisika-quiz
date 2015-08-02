var Controller = require('./../controller');

/**
 * if the route (verb) has not controller, set it to null
 */

var routes = {
  '/': {
    get: Controller.retrieveAll
  , post: Controller.create
	, put: null
	//, delete: Controller.removeAll
  },
  '/:id':  {
    get: Controller.retrieveById
  , post: Controller.submitById
  , put: Controller.modifyById
  , delete: Controller.removeById
  }
};

module.exports = routes;
