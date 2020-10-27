'use strict';

const watcher = require('./watcher.js');

const pathname = process.argv[2] || '.';

watcher.watch(pathname, (evt, name) => {
	console.log(`[${pathname}]`, evt, name);
});
