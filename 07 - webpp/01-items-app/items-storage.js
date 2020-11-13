'use strict'

let db = null

module.exports = {
	
	readAllItems: function (done) {
		setTimeout(() => {
			done(null, db)
		}, 100)
	},
	
	createItem: function (item, done) {
		setTimeout(() => {
			const items = db || []
			items.push(item)
			db = items
			done(null, items.length - 1)
		}, 200)
	}
}