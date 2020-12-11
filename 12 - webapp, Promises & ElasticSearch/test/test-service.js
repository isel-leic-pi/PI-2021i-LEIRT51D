'use strict'

const expect = require('chai').expect

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
				expect(items).to.be.an('array').that.is.empty
				
				done()
			})
		})
		it('should return an array with length of 1 for 1 items', function (done) {
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
				expect(items).to.be.an('array').with.a.lengthOf(1)
				
				done()
			})
		})
	})
})
