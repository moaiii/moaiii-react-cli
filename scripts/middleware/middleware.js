/** 1. Imports  */
const aMiddleware = require('src/a.middleware.js');

const middlewares = {
  /** 2. Combined middleware functions */
  ...aMiddleware,

};

module.exports = function(store, next, action) {

  let middleware = middlewares[action.type];

  if (middleware) {
    middleware(store, next, action);
  }

  next(action);
};