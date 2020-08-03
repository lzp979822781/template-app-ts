const fs = require('fs');
const path = require('path');
const dest = path.join(__dirname, 'demo');
console.log("dest", dest);
if(!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}
