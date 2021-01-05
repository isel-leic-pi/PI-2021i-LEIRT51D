'use strict'

const express = require('express')

const error = require('./items-errors.js')

function webui(service) {
	
	const theWebUI = {

		home: (req, res) => {
			res.render('home')
		},
		
		list: (req, res) => {
			service.getAllItems()
			.then(items => {
				const answer = { 'items': items, 'size': items.length }
				res.render('list', answer)
			})
			.catch(err => {
				console.log('ERROR', 'Failed to get items.', err)
				res.statusCode = 500;
				res.send(`<html><body><strong>ERROR</strong> ${err}</body></html>`)
			})
		},
		
		insertUI: (req, res) => {
			res.render('insert')
		},
		
		addItem: (req, res) => {

			// body: txtItem=ITEMTEXT&txtOtherItem=OTHERITEM&....
			//       ->
			//     { txtItem: ITEMTEXT; txtOtherItem: OTHERITEM; ... }

			const item = { text: req.body.txtItem }

			service.newItem(item)
			.then(id => {
				const answer = { 'id': id }
				setTimeout(() => { // Allow elasticsearch to update the index
					res.redirect('/items') // Avoid users repeated requests via refresh
				}, 1000);
			})
			.catch(err => {
				// Error handling incomplete! To be continued...
				switch (err) {
					case error.MISSING_ARGUMENT:
						console.log('ERROR', 'Missing argument.', err)
						res.statusCode = 400;
						res.send(`<html><body><strong>ERROR</strong> Missing argument</body></html>`)
						break;
					default:
						console.log('ERROR', 'Failed to publish items.', err)
						res.statusCode = 500;
						res.send(`<html><body><strong>ERROR</strong> Failed to publish items</body></html>`)
						break;
				}
			})
		},
		
		quote: (req, res) => {
			service.getQuote()
			.then(quote => {
				const answer = { 'quote': quote }
				res.render('quote', answer)
			})
			.catch(err => {
				// Error handling incomplete! To be continued...
				switch (err) {
					case error.EXTERNAL_SERVICE_FAILURE:
						console.log('ERROR', 'External service failure.', err)
						res.statusCode = 502;
						res.send(`<html><body><strong>ERROR</strong> External service failure</body></html>`)
						break;
					default:
						console.log('ERROR', 'Failed to get quote.', err)
						res.statusCode = 502;
						res.send(`<html><body><strong>ERROR</strong> Failed to get quote</body></html>`)
						break;
				}
				res.redirect('/')
			})
		}
	}

	const router = express.Router();
	router.use(express.urlencoded({ extended: true }))
	
	router.get('/',       theWebUI.home)
	router.get('/items',  theWebUI.list)
	router.post('/items', theWebUI.addItem)
	router.get('/insert', theWebUI.insertUI)
	router.get('/quote',  theWebUI.quote)
	
	return router;
}

module.exports = webui
