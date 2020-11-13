'use strict'

const storage = require('./items-storage.js')
const quotes = require('./items-quotes.js')
const error = require('./items-errors.js')

module.exports = {

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
