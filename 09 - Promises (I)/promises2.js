'use strict'

function longRunning1(arg, done) {
	setTimeout(() => {
		done(arg + 3)
	}, 4000)
}

longRunning1(2, res => { console.log(res) })

// ====

function longRunning2(arg) {
	return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(arg + 3)
			}, 5000)
		})
}

const promisedResult = longRunning2(3)
promisedResult.then(res => { console.log(res) })

longRunning2(4).then(res => { console.log(res) })
