
// const requireContext = require("require-context");
// const context = requireContext('./', true, /\.(j|t)s[x]?$/);
/* const context = require.context('./', true, /\.(js|ts)[x]?$/);
// const fs = require('fs');
// const context = require('babel-plugin-require-context-hook/register')('./', true, /\.(j|t)s[x]?$/);
const keysArr: string[] = context.keys().filter(item => item !== './index.js').map(key => context(key));
console.log("context", context);
console.log("keysArr", keysArr);
export default keysArr; */

import hello from './hello';
import test from './test';

export { hello, test };