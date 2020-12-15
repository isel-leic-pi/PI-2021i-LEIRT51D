'use strict';

const frisby = require('frisby');

const base_url = 'http://localhost:8888'

describe(`Integration tests on ${base_url}`, () => {

	describe('Checking if server is running', () => {
		test ('the server must be running', () => {
			return frisby.get(`${base_url}/`)
		});
	});
	
	describe("Testing 'quotes'", () => {
		describe('GET /quotes', () => {
			it ('should return a fresh quote', () => {
				return frisby
					.get(`${base_url}/quote`)
					.expect('status', 200)
					.expect('header', 'Content-Type', 'application/json; charset=utf-8')
					.expect('jsonTypes', {
						'quote': frisby.Joi.string().required()
					})
			});
		});
	});

	describe("Testing 'items'", () => {
		describe('POST /items', () => {
			it ('should refuse an empty body', () => {
				return frisby
					.post(`${base_url}/items`)
					.expect('status', 400)
					.expect('header', 'Content-Type', 'application/json; charset=utf-8')
					.expect('jsonTypes', {
						'cause': frisby.Joi.string().required()
					})
			});
			it ("should refuse a body without 'text'", () => {
				return frisby
					.post(`${base_url}/items`, {
						"__unknown_property__": "abc"
					})
					.expect('status', 400)
					.expect('header', 'Content-Type', 'application/json; charset=utf-8')
					.expect('jsonTypes', {
						'cause': frisby.Joi.string().required()
					})
			});
		});

		describe('GET /items', () => {
			it ('should return a list of items', () => {
				return frisby
					.get(`${base_url}/items`)
					.expect('status', 200)
					.expect('header', 'Content-Type', 'application/json; charset=utf-8')
					.expect('jsonTypes', {
						'items': frisby.Joi.array().required(),
						'size': frisby.Joi.number().required()
					})
					.expect('jsonTypes', 'items.*',
						frisby.Joi.string()
					).then(function (res) {
						expect(res.json.items.length)
							.toEqual(res.json.size);
					});
			});
		});
	});
	
});
