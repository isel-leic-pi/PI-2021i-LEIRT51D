'use strict'

const default_port = 8888
const port = process.argv[2] || default_port

const express = require('express')
const app = express()

const webapi = require('./items-webapi.js')

app.get('/items', webapi.listItems)
app.post('/items', webapi.publishItem)

app.listen(port)
