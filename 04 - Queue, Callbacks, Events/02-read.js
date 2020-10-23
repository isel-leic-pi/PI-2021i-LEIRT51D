'use strict';

const fs = require('fs');

const filename = process.argv[2];

if (!filename) {
	throw Error('A filename is required as argument.');
}

fs.readFile(filename, processFile);
console.log('Reading');

function processFile(err, data) {
	console.log('File read');
	if (err) {
		console.log('Read failed!', err);
		return;
	}
	const contents = data.toString();
	console.log('Contents:', contents);
}
