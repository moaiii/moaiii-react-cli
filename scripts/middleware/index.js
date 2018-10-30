const fs = require('fs');

/**
 * @type {name: string, path: string}
 * @param {Array<middleware>} middlewares
 * @param {string} middleware.type
 * @param {string} middleware.name
 * @param {string} middleware.path
 */
const addMiddleware = ( middlewares) => {
  const baseFile = 'base.txt';
  const outputFileName = 'middleware.js';

  const sections = {
    "import": "/** 1. Imports  */",
    "combine": "/** 2. Combined middleware functions */"
  };

  var rl = require('readline')
    .createInterface({
      input: fs.createReadStream(__dirname + '/' + baseFile),
      output: fs.createWriteStream(__dirname + '/' + outputFileName)
    });

  rl.on('line', function (line) {

    if( line.includes(sections.import) ) {
      rl.output.write(line + '\n');

      middlewares.forEach( middleware => {
        rl.output.write(`const ${middleware.name}Middleware = require(\'./${middleware.path}\');`);
        rl.output.write('\n');
      });

    } else if( line.includes(sections.combine) ) {
      rl.output.write(line + '\n');

      middlewares.forEach( middleware => {
        rl.output.write(`  ...${middleware.name}Middleware,`);
        rl.output.write('\n');
      });

    } else {
      rl.output.write(line + '\n');
    }
  });
}

module.exports = {addMiddleware};