'use strict'

const PORT = 8888

const express = require('express')
const app = express()

app.use((req, res, next) => {
	console.log('.. interceptor 1 ..')
	next()
})

app.use(
	'/items',
	(req, res, next) => {
		console.log('.. interceptor 2 ..')
		next()
	},
	(req, res, next) => {
		console.log('.. interceptor 3 ..')
		next()
	}
)

app.use('/images', express.static('files'))

app.get('/', (req, res) => {
	console.log(':: APP / ::')
	res.send(':: APP / ::')
})

app.get('/items', (req, res) => {
	console.log(':: APP /items ::')
	res.send(':: APP /items ::')
})
app.get('/items/help', (req, res) => {
	console.log(':: APP /items/help ::')
	res.send(':: APP /items/help ::')
})

app.get('/data', (req, res) => {
	console.log(':: APP /data ::')
	res.send(':: APP /data ::')
})

app.listen(PORT)
