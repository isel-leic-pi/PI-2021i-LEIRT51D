'use strict';

const fs = require('fs');

const pathname = process.argv[2] || '.';

fs.access(pathname, err => {
	if (err) {
		throw Error(`Pathname "${pathname}" does not exist or is inaccessible.`);
	} else {
		fs.watch(pathname, (evt, name) => {
			if (evt === 'rename') {
				console.log(`[${pathname}]`, evt, name);
				fs.access(pathname + '\\' + name, err => {
					if (err) {
						console.log(`[${pathname}]`, 'delete', name);
					} else {
						console.log(`[${pathname}]`, 'create', name);
					}
				})
			} else {
				console.log(`[${pathname}]`, evt, name);
			}
		});
	}
});
