/* eslint-disable */
const tasks = require('./tasks');

console.log('[Webpack -- Building NPM Package]');
console.log('--------------------------------');
exec('webpack --config webpack.config.npm.js --progress --profile --colors');
