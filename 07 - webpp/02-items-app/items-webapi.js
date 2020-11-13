'use strict'

const error = require('./items-errors.js')

function webapi(app, service) {
	
	const theWebApi = {

		publishItem: (req, res) => {
			
			// 1. extract params
			let body = ''
			req.on('data', chunk => {
				body += chunk.toString()
			}).on('end', () => {
				const item = JSON.parse(body)
				
				// 2. invoke service
				service.newItem(item, (err, id) => {
					
					// 3. send response
					if (!err) {
						const answer = { 'id': id }
						res.json(answer)
					} else {
						switch (err) {
							case error.MISSING_ARGUMENT:
								res.status(400).json({ cause: 'Missing argument.' })
								break;
							default:
								res.status(500).json({ cause: 'Failed to publish items.'})
								break;
						}
					}
				})
			})
		},
		
		listItems: (req, res) => {
			// 1. extract params
			// ... nothing to do ...
			
			// 2. invoke service
			service.getAllItems((err, items) => {
				
				// 3. send response
				if (!err) {
					const answer = { 'items': items, 'size': items.length }
					res.json(answer)
				} else {
					res.status(500).json({ cause: 'Failed to get items.'})
				}
			})
		},
		
		getQuote: (req, res) => {
			// 1. extract params
			// ... nothing to do ...
			
			// 2. invoke service
			service.getQuote((err, quote) => {
				
				// 3. send response
				if (!err) {
					const answer = { 'quote': quote }
					res.json(answer)
				} else {
					switch (err) {
						case error.EXTERNAL_SERVICE_FAILURE:
							res.status(502).json({ cause: 'External service failure.' })
							break;
						default:
							res.status(500).json({ cause: 'Failed to get quote.'})
							break;
					}
				}
			})
		}
	}
	
	app.get('/quote', theWebApi.getQuote)
	app.get('/items', theWebApi.listItems)
	app.post('/items', theWebApi.publishItem)
	
	return theWebApi
}

module.exports = webapi
