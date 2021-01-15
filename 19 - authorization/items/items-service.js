'use strict'

const error = require('./items-errors.js')

function service(storage, quotes) {
	
	const theService = {

		getQuote: async (user) => {

			if (!user) {
				throw error.UNAUTHENTICATED
			}

			if (!user.canGetQuote) {
				throw error.UNAUTHORIZED
			}
			
			return quotes.getQuote()
		},

		getAllItems: async (user) => {

			if (!user) {
				throw error.UNAUTHENTICATED
			}

			if (!user.canList) {
				throw error.UNAUTHORIZED
			}
			
			const items = await storage.readAllItems()
			return items || []
		},

		newItem: async (user, item) => {

			if (!user) {
				throw error.UNAUTHENTICATED
			}

			if (!user.canInsert) {
				throw error.UNAUTHORIZED
			}
			
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
