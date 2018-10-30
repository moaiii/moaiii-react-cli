/** 1. Imports  */
import xMiddleware from 'src/x.middleware.js';
import zMiddleware from 'src/z.middleware.js';
import bMiddleware from 'src/a/b/b.middleware.js';
import tMiddleware from 'src/a/b/t.middleware.js';
import laskdfldsfMiddleware from 'src/laskdfldsf.middleware.js';

const middlewares = {
  /** 2. Combined middleware functions */
  ...xMiddleware,
  ...zMiddleware,
  ...bMiddleware,
  ...tMiddleware,
  ...laskdfldsfMiddleware,

};

export default (store, next, action) => {

  let middleware = middlewares[action.type];

  if (middleware) {
    middleware(store, next, action);
  }

  next(action);
}
