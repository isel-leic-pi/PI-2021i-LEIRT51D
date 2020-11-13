'use strict'

const assert = require('assert')

const serviceCreator = require('../items-service.js')

describe('Service', function () {
	describe('getAllItems', function() {
		it('should return empty array for 0 items', function (done) {
			// Arrange
			const storage = {
				readAllItems: function (done) {
					setImmediate(() => {
						done(null, null)
					})
				}
			}
			const quotes = null
			const service = serviceCreator(storage, quotes)
			
			// Act
			service.getAllItems((err, items) => {

				// Assert
				const result = Array.isArray(items) && items.length == 0
				assert.equal(result, true)
				
				done()
			})
		})
		it('should return size = 1 for 1 items', function (done) {
			const storage = {
				readAllItems: function (done) {
					setImmediate(() => {
						done(null, ['alpha'])
					})
				}
			}
			const quotes = null
			const service = serviceCreator(storage, quotes)
			
			// Act
			service.getAllItems((err, items) => {

				// Assert
				const result = Array.isArray(items) && items.length == 1
				assert.equal(result, true)
				
				done()
			})
		})
	})
})
