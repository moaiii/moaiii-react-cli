#!/usr/bin/env node

const chokidar = require('chokidar');
const argv = require('yargs').argv;
const { addMiddleware } = require('./scripts/middleware');
const { addReducer } = require('./scripts/reducer');


/**
 * Globals
 */
const SRC_FOLDER = argv.src;
let MIDDLEWARES = [];
let REDUCERS = [];


/**
 * @param {string} forLog
 */
const logger = ( forLog ) => {
  const mode = argv.mode;
  if( mode === 'debug') console.log( forLog );
}


/**
 * @param {string} fileDetails.name
 * @param {string} fileDetails.type
 * @param {string} fileDetails.path
 * @return {void}
 */
const _addMiddlewares = ( fileDetails ) => {
  MIDDLEWARES.push(fileDetails);
  logger(MIDDLEWARES);
  addMiddleware(MIDDLEWARES);
}


/**
 * @param {string} fileDetails.name
 * @param {string} fileDetails.type
 * @param {string} fileDetails.path
 * @return {void}
 */
const _addReducers = ( fileDetails ) => {
  REDUCERS.push(fileDetails);
  logger(REDUCERS);
  addReducer(REDUCERS);
}


/**
 * @param {string} fileDetails.name
 * @param {string} fileDetails.type
 * @param {string} fileDetails.path
 * @return {void}
 */
const _removeMiddlewares = ( fileDetails ) => {
  let newMiddlewareArray = MIDDLEWARES
    .filter( middleware =>
      middleware.name !== fileDetails.name);

  MIDDLEWARES = newMiddlewareArray;
  logger( MIDDLEWARES );
  addMiddleware( MIDDLEWARES );
}


/**
 * @param {string} fileDetails.name
 * @param {string} fileDetails.type
 * @param {string} fileDetails.path
 * @return {void}
 */
const _removeReducers = ( fileDetails ) => {
  let newReducerArray = REDUCERS
    .filter( reducer =>
      reducer.name !== fileDetails.name);

  REDUCERS = newReducerArray;
  logger( REDUCERS );
  addReducer( REDUCERS );
}


/**
 * @param {string} path
 * @return {Object<string, string>}
 */
const _getFileDetailsFromPath = ( path ) => {
  const parts = path.split('/');
  const len = parts.length;
  const fileName = parts[len - 1];
  const fileNameParts = fileName.split('.');

  return {
    "type": fileNameParts.length === 3 ? fileNameParts[1] : null,
    "name": fileNameParts[0],
    "path": path
  }
}


/**
 * @param {string} path
 * @param {Object} stats
 * @return {void}
 */
const _addFile = (path) => {
  const fileDetails = _getFileDetailsFromPath( path );

  if( fileDetails.type === "middleware" ) {
    _addMiddlewares(fileDetails);
  } else if( fileDetails.type === "reducer" ) {
    _addReducers(fileDetails);
  }
}


/**
 * @param {string} path
 * @param {Object} stats
 * @return {void}
 */
const _removeFile = (path) => {
  const fileDetails = _getFileDetailsFromPath( path );

  if( fileDetails.type === "middleware" ) {
    _removeMiddlewares( fileDetails );
  } else if( fileDetails.type === "reducer" ) {
    _removeReducers( fileDetails );
  }
}


/**
 * Finally, watch for file changes
 */
var watcher = chokidar
  .watch(SRC_FOLDER, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    awaitWriteFinish: true
  });

  watcher
    .on('add', (path, stats) => _addFile(path, stats))
    .on('unlink', (path, stats) => _removeFile(path, stats));

module.exports = watcher;