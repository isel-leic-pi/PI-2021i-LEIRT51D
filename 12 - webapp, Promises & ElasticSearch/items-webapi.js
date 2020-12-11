'use strict'

const express = require('express')

const error = require('./items-errors.js')

function webapi(app, service) {
	
	const theWebApi = {

		publishItem: (req, res) => {

			// 1. check body
			const item = req.body
			
			if (item) {
				
				// 2. invoke service
				service.newItem(item)
				.then(id => {
					const answer = { 'id': id }
					res.json(answer)
				})
				.catch(err => {
					switch (err) {
						case error.MISSING_ARGUMENT:
							res.status(400).json({ cause: 'Missing argument.' })
							break;
						default:
							res.status(500).json({ cause: 'Failed to publish items.'})
							break;
					}
				})
				
			} else {
				res.status(400).json({ cause: 'Argument required.' })	
			}
		},
		
		listItems: (req, res) => {
			service.getAllItems()
			.then(items => {
				const answer = { 'items': items, 'size': items.length }
				res.json(answer)
			})
			.catch(err => {
				res.status(500).json({ cause: 'Failed to get items.'})
			})
		},
		
		getQuote: (req, res) => {
			service.getQuote()
			.then(quote => {
				const answer = { 'quote': quote }
				res.json(answer)
			})
			.catch(err => {
				switch (err) {
					case error.EXTERNAL_SERVICE_FAILURE:
						res.status(502).json({ cause: 'External service failure.' })
						break;
					default:
						res.status(500).json({ cause: 'Failed to get quote.'})
						break;
				}
			})
		}
	}

	app.use(express.json())
	
	app.get('/quote', theWebApi.getQuote)
	app.get('/items', theWebApi.listItems)
	app.post('/items', theWebApi.publishItem)
	
	return theWebApi
}

module.exports = webapi
