/** 1. Imports  */
const aReducer = require('./src/a.reducer.js');
const bReducer = require('./src/b.reducer.js');
const cReducer = require('./src/c.reducer.js');
const somethingReducer = require('./src/something.reducer.js');

// redux
import { combineReducers } from "redux"

// Combine Reducers
module.exports = combineReducers({
  /** 2. Combine reducers */
  aReducer,
  bReducer,
  cReducer,
  somethingReducer,

});
