'use strict'

module.exports = {

	getAllItems: (resFunc) => {
		setTimeout(() => { resFunc(undefined, ['alpha', 'beta', 'gamma']) }, 200)
	},

	newItem: (item, resFunc) => {
		setTimeout(() => { resFunc(undefined, 1) }, 200)
	}
	
}
