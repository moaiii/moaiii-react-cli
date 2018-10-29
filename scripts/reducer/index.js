const fs = require('fs');


/**
 * @type {name: string, path: string}
 * @param {Array<reducer>} reducers
 * @param {string} reducer.type
 * @param {string} reducer.name
 * @param {string} reducer.path
 */
const addReducer = ( reducers) => {
  const baseFile = 'base.txt';
  const outputFile = 'store.js';

  const sections = {
    "import": "/** 1. Imports  */",
    "combine": "/** 2. Combine reducers */"
  };

  var rl = require('readline')
    .createInterface({
      input: fs.createReadStream(__dirname + '/' + baseFile),
      output: fs.createWriteStream(__dirname + '/' + outputFile)
    });

  rl.on('line', function (line) {

    if( line.includes(sections.import) ) {
      rl.output.write(line + '\n');

      reducers.forEach( reducer => {
        rl.output.write(`import ${reducer.name}Reducer from \'${reducer.path}\';`);
        rl.output.write('\n');
      });

    } else if( line.includes(sections.combine) ) {
      rl.output.write(line + '\n');

      reducers.forEach( reducer => {
        rl.output.write(`  ${reducer.name}Reducer,`);
        rl.output.write('\n');
      });

    } else {
      rl.output.write(line + '\n');
    }
  });
}

module.exports = {addReducer};