'use strict';

const fs = require('fs');

const folder = process.argv[2] || '.';

fs.watch(folder, (evt, name) => {
	console.log(`[${folder}]`, evt, name);
});
