'use strict';

const frisby = require('frisby');
const setCookieParser = require('set-cookie-parser');

const base_url = 'http://localhost:8888/api'

describe(`Integration tests on ${base_url}`, () => {

	describe('Checking if server is running', () => {
		test ('the server must be running', () => {
			return frisby.get(`${base_url}/`)
		});
	});
	
	describe("Testing 'login'", () => {
		describe('POST /login', () => {
			it ('should accept a valid login', () => {
				return frisby
					.post(`${base_url}/login`, {
						"username": "admin",
						"password": "admin"
					})
					.expect('status', 200)
					.expect('header', 'Content-Type', 'application/json; charset=utf-8')
					.expect('json', 'result', 'ok')
					.then(res => {
						const sessionCookie = setCookieParser.parseString(
							res.headers.get('set-cookie')
						)

						frisby.globalSetup({
							request: {
								headers: {
									'Cookie': `${sessionCookie.name}=${sessionCookie.value}`
								}
							}
						})
					})
			})
		})
	})
	
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
	})
	
	describe("Testing 'logout'", () => {
		describe('POST /logout', () => {
			it ('should accept logout', () => {
				return frisby
					.post(`${base_url}/logout`)
					.expect('status', 200)
					.expect('header', 'Content-Type', 'application/json; charset=utf-8')
					.expect('json', 'result', 'ok')
			});
		});
	});
	
});
