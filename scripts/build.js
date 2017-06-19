/* eslint-disable */
const tasks = require('./tasks');

console.log('[Webpack Build]');
console.log('--------------------------------');
exec('webpack --config webpack.config.prod.js --progress --profile --colors');
