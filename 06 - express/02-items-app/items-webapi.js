'use strict'

const service = require('./items-service.js')

module.exports = {
	
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
					res.status(500).send('Failed to publish items.')
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
				res.status(500).send('Failed to get items.')
			}
		})
	}
}