/** 1. Imports  */
import zMiddleware from 'src/z.middleware.js';
import xMiddleware from 'src/x.middleware.js';
import bMiddleware from 'src/a/b/b.middleware.js';
import tMiddleware from 'src/a/b/t.middleware.js';

const middlewares = {
  /** 2. Combined middleware functions */
  ...zMiddleware,
  ...xMiddleware,
  ...bMiddleware,
  ...tMiddleware,

};

export default (store, next, action) => {

  let middleware = middlewares[action.type];

  if (middleware) {
    middleware(store, next, action);
  }

  next(action);
}
