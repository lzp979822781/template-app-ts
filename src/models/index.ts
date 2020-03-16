const context = require.context('./', true, /\.(j|t)s[x]?$/);
console.log("context", context);
const keysArr: string[] = context.keys().filter(item => item !== './index.js').map(key => context(key));
export default keysArr;