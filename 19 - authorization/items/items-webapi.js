'use strict'

const express = require('express')

const error = require('./items-errors.js')

function webapi(auth, service) {

	function onError(res, err, msg) {
		switch (err) {
			case error.UNAUTHENTICATED:
				res.status(401).json({ cause: 'Requires login.' })
				break;
			case error.UNAUTHORIZED:
				res.status(403).json({ cause: 'Not allowed for user.' })
				break;
			case error.MISSING_ARGUMENT:
				res.status(400).json({ cause: 'Missing argument.' })
				break;
			case error.EXTERNAL_SERVICE_FAILURE:
				res.status(502).json({ cause: 'External service failure.' })
				break;
			default:
				res.status(500).json({ cause: msg})
				break;
		}
	}
	
	const theWebApi = {

		login: (req, res) => {

			// 1. check body
			const loginInfo = req.body

			const username = loginInfo.username
			const password = loginInfo.password
			
			auth.login(req, username, password)
			.then(() => {
				const answer = { 'result': 'ok' }
				res.json(answer)
			})
			.catch(err => {
				onError(res, err, 'Login failed.')
			})
		},
		
		logout: (req, res) => {
			
			auth.logout(req)
			.then(() => {
				const answer = { 'result': 'ok' }
				res.json(answer)
			})
			.catch(err => {
				onError(res, err, 'Logout failed.')
			})			
		},

		publishItem: (req, res) => {

			// 1. check body
			const item = req.body

			// 2. invoke service
			service.newItem(req.user, item)
			.then(id => {
				const answer = { 'id': id }
				res.json(answer)
			})
			.catch(err => {
				onError(res, err, 'Failed to publish items.')
			})
		},
		
		listItems: (req, res) => {
			service.getAllItems(req.user)
			.then(items => {
				const answer = { 'items': items, 'size': items.length }
				res.json(answer)
			})
			.catch(err => {
				onError(res, err, 'Failed to get items.')
			})
		},
		
		getQuote: (req, res) => {
			service.getQuote(req.user)
			.then(quote => {
				const answer = { 'quote': quote }
				res.json(answer)
			})
			.catch(err => {
				onError(res, err, 'Failed to get quote.')
			})
		}
	}

	const router = express.Router();
	router.use(express.json())
	
	router.post('/login',  theWebApi.login)
	router.post('/logout', theWebApi.logout)
	router.get('/quote',   theWebApi.getQuote)
	router.get('/items',   theWebApi.listItems)
	router.post('/items',  theWebApi.publishItem)
	
	return router;
}

module.exports = webapi
