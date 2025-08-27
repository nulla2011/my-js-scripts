const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(process.argv[2]));
fs.renameSync(process.argv[2], process.argv[2].slice(0, -5) + '_old.json');
delete data.skins.default;
delete data.skins.normal_j;
delete data.skins.reverse;
delete data.skins.reverse_j;
fs.writeFileSync(process.argv[2], JSON.stringify(data));
