'use strict'

const express = require('express')

const app = express()

app.get('/', (request, response) => {
	response.send('Hello world!')
})

app.get('/show', (request, response) => {
	response.write(request.method + '\n')
	response.write(request.path + '\n')
	response.write(JSON.stringify(request.query) + '\n')
	response.send()
})

app.get('/pages/:username/info/:infoitem', (request, response) => {
	response.write(request.method + '\n')
	response.write(request.path + '\n')
	response.write(JSON.stringify(request.query) + '\n')
	response.write(JSON.stringify(request.params) + '\n')
	response.send()
})

app.listen(8888)

