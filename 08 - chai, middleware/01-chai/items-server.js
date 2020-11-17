'use strict'

const default_port = 8888
const port = process.argv[2] || default_port

const express = require('express')
const app = express()

const storage = require('./items-storage.js')
const quotes = require('./items-quotes.js')

const serviceCreator = require('./items-service.js')
const service = serviceCreator(storage, quotes)

const webapiCreator = require('./items-webapi.js')
const webapi = webapiCreator(app, service)

app.listen(port)
