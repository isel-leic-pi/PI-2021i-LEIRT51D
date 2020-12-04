'use strict'

const BasicPromiseState = {
	PENDING:   'pending',
	FULFILLED: 'fulfilled',
	REJECTED:  'rejected'
}

function BasicPromise(oper) {
	
	const state = {
		state: BasicPromiseState.PENDING,
		result: null,
		error: null,
		pendingThens: [],
		pendingCatches: []		
	}
	
	this.then = function (callback) {
		if (state.state === BasicPromiseState.PENDING) {
			state.pendingThens.push(callback)
		} else if (state.state === BasicPromiseState.FULFILLED) {
			callback(state.result)
		}
	}
	
	this.catch = function (callback) {
		if (state.state === BasicPromiseState.PENDING) {
			state.pendingCatches.push(callback)
		} else if (state.state === BasicPromiseState.REJECTED) {
			callback(state.error)
		}
	}
	
	oper(fulfill, reject)
	
	return this
	
	function fulfill(result) {
		if (state.state === BasicPromiseState.PENDING) {
			state.state = BasicPromiseState.FULFILLED
			state.result = result
			setImmediate(() => {
				for (let cb of state.pendingThens) {
					cb(result)
				}
			})
		}
	}
	
	function reject(error) {
		if (state.state === BasicPromiseState.PENDING) {
			state.state = BasicPromiseState.REJECTED
			state.error = error
			setImmediate(() => {
				for (let cb of state.pendingCatches) {
					cb(error)
				}
			})
		}
	}
}

module.exports = BasicPromise
