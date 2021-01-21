'use strict'

const expect = require('chai').expect

const serviceCreator = require('../items-service.js')

const almightyUser = {
	username: "almighty",
	password: 1234,
	canList: true,
	canInsert: true,
	canGetQuote: true
}

describe('Service', function () {
	describe('getAllItems', function() {
		it('should return empty array for 0 items', function (done) {
			// Arrange
			const storage = {
				readAllItems: function () {
					return new Promise((resolve, reject) => { 
						setImmediate(() => {
							resolve(null)
						})
					})
				}
			}
			const quotes = null
			const service = serviceCreator(storage, quotes)
			
			// Act
			service.getAllItems(almightyUser)
			.then(items => {

				// Assert
				expect(items).to.be.an('array').that.is.empty
				
				done()
			})
		})
		it('should return an array with length of 1 for 1 items', function (done) {
			const storage = {
				readAllItems: function () {
					return new Promise((resolve, reject) => { 
						setImmediate(() => {
							resolve(['alpha'])
						})
					})
				}
			}
			const quotes = null
			const service = serviceCreator(storage, quotes)
			
			// Act
			service.getAllItems(almightyUser)
			.then(items => {

				// Assert
				expect(items).to.be.an('array').with.a.lengthOf(1)
				
				done()
			})
		})
	})
})
