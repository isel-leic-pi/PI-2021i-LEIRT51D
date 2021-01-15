'use strict'

const express = require('express')

const error = require('./items-errors.js')

function webui(auth, service) {

	function onError(res, err, msg) {
		
		function sendError(code, errorMsg) {
			console.log(`ERROR #${err}:`, errorMsg)
			res.statusCode = code;
			res.send(`<html><body><strong>ERROR</strong> ${errorMsg}</body></html>`)
		}
		
		switch (err) {
			case error.UNAUTHENTICATED:
				sendError(401, 'This operation requires login.')
				break;
			case error.UNAUTHORIZED:
				sendError(403, 'Operation not allowed for this user.')
				break;
			case error.MISSING_ARGUMENT:
				sendError(400, 'Missing argument.')
				break;
			case error.EXTERNAL_SERVICE_FAILURE:
				sendError(502, 'External service failure.')
				break;
			default:
				sendError(500, msg)
				break;
		}
	}
	
	const theWebUI = {

		login: (req, res) => {
			auth.login(req, req.body.username, req.body.password)
			.then(() => {
				res.redirect('/')
			})
			.catch(err => {
				res.statusCode = 401
				res.render('logerr', { user: req.user, error: err })
			})
		},

		logout: (req, res) => {
			auth.logout(req)
			.then(() => {
				res.redirect('/')
			})
			.catch(err => {
				res.statusCode = 401
				res.render('logerr', { user: req.user, error: err })
			})
		},

		loginForm: (req, res) => {
			res.render('login', { user: req.user })
		},

		home: (req, res) => {
			res.render('home', { user: req.user })
		},
		
		list: (req, res) => {
			service.getAllItems(req.user)
			.then(items => {
				const answer = { 'user': req.user, 'items': items, 'size': items.length }
				res.render('list', answer)
			})
			.catch(err => {
				onError(res, err, 'Failed to get items.')
			})
		},
		
		insertUI: (req, res) => {
			res.render('insert', { user: req.user })
		},
		
		addItem: (req, res) => {

			// body: txtItem=ITEMTEXT&txtOtherItem=OTHERITEM&....
			//       ->
			//     { txtItem: ITEMTEXT; txtOtherItem: OTHERITEM; ... }

			const item = { text: req.body.txtItem }

			service.newItem(req.user, item)
			.then(id => {
				const answer = { 'id': id }
				setTimeout(() => { // Allow elasticsearch to update the index
					res.redirect('/items') // Avoid users repeated requests via refresh
				}, 1000);
			})
			.catch(err => {
				onError(res, err, 'Failed to publish items.')
			})
		},
		
		quote: (req, res) => {
			service.getQuote(req.user)
			.then(quote => {
				const answer = { 'user': req.user, 'quote': quote }
				res.render('quote', answer)
			})
			.catch(err => {
				onError(res, err, 'Failed to get quote.')
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

	router.get('/login',  theWebUI.loginForm)
	router.post('/login', theWebUI.login)
	router.get('/logout', theWebUI.logout)
	
	return router;
}

module.exports = webui
