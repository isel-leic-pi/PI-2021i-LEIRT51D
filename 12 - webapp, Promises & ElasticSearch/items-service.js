'use strict'

const error = require('./items-errors.js')

function service(storage, quotes) {
	
	const theService = {

		getQuote: async () => quotes.getQuote(),

		getAllItems: async () => {
			const items = await storage.readAllItems()
			return items || []
		},

		newItem: async (item) => {
			if (item && item.text) {
				return storage.createItem(item.text)
			} else {
				throw error.MISSING_ARGUMENT
			}
		}
	}
	
	return theService

}

module.exports = service
