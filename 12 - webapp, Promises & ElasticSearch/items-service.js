'use strict'

const error = require('./items-errors.js')

function service(storage, quotes) {
	
	const theService = {

		getQuote: (resFunc) => {
			quotes.getQuote((err, quote) => {
				if (!err) {
					resFunc(null, quote)
				} else {
					// TO DO : translate errors?
					resFunc(err)
				}
			})
		},

		getAllItems: (resFunc) => {
			storage.readAllItems((err, items) => {
				if (!err) {
					resFunc(null, items || [])
				} else {
					// TO DO : translate errors
				}
			})
		},

		newItem: (item, resFunc) => {
			if (item && item.text) {
				storage.createItem(item.text, (err, id) => {
					if (!err) {
						resFunc(null, id)
					} else {
						// TO DO : translate errors
					}
				})
			} else {
				resFunc(error.MISSING_ARGUMENT, null)
			}
		}
	}
	
	return theService

}

module.exports = service
