'use strict'

const fetch = require('node-fetch')
const error = require('./items-errors.js')

module.exports = {

	getQuote: async function () {
		
		try {
			const response = await fetch('https://loripsum.net/api/1/short/plaintext')
			if (response.status == 200) {
				const data = await response.text()
				return data.slice(57, -3).toString()
			}
			console.log("quotes", "statusCode:", response.statusCode)
		} catch (err) {
			console.log("quotes", "error", err)
		}
		throw error.EXTERNAL_SERVICE_FAILURE
		
	}
	
}
