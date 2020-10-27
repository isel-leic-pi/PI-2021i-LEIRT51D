module.exports = {
	watch: modifiedWatch
}

const fs = require('fs');

function modifiedWatch(pathname, processEvent) {
	fs.access(pathname, err => {
		if (err) {
			throw Error(`Pathname "${pathname}" does not exist or is inaccessible.`);
		} else {
			fs.watch(pathname, (evt, name) => {
				if (evt === 'rename') {
					fs.access(pathname + '\\' + name, err => {
						if (err) {
							processEvent('delete', name)
						} else {
							processEvent('create', name)
						}
					})
				} else {
					processEvent(evt, name)
				}
			})
		}
	})
}
