'use strict'

const fetch = require('node-fetch')

function storage(host, port) {
	
	const baseUrl = `http://${host}:${port}`
	
	const itemsBaseUrl = `${baseUrl}/items`
	
	const theStorage = {
		
		readAllItems: async function () {
			try {
				const response = await fetch(`${itemsBaseUrl}/_search?size=100`)
				
				const answer = await response.json()
				
				const hits = answer.hits.hits
				
				const items = hits.map(hit => hit._source.text)
				
				return items
				
			} catch (err) {
				return []; // a bad idea; do not ignore errors!
			}
		},
		
		createItem: async function (item) {
			try {
				const response = await fetch(`${itemsBaseUrl}/_doc`, {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"text": item
					})
				})
				
				const answer = await response.json()
				
				return answer._id
				
			} catch (err) {
				return -1; // a bad idea; do not ignore errors!
			}
		}
	}
	
	return theStorage

}

module.exports = storage
