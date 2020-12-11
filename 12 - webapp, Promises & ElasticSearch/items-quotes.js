'use strict'

const urllib = require('urllib')
const error = require('./items-errors.js')

module.exports = {

	getQuote: function (done) {
		
		urllib.request('https://loripsum.net/api/1/short/plaintext',
			(err, data, res) => {
				if (!err) {
					if (res.statusCode == 200) {
						done(null, data.slice(57, -3).toString())
					} else {
						// TO DO : translate errors
						done(error.EXTERNAL_SERVICE_FAILURE)
					}
				} else {
					// TO DO : translate errors
					done(error.EXTERNAL_SERVICE_FAILURE)
				}
			}
		)
		
	}
	
}
