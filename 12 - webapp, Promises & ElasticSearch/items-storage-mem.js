'use strict'

let db = null

module.exports = {
	
	readAllItems: function () {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(db)
			}, 100)
		})
	},
	
	createItem: function (item) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const items = db || []
				items.push(item)
				db = items
				resolve(items.length - 1)
			}, 200)
		})
	}
}