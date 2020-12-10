'use strict'

function delay(secs, value) {
	return new Promise(resolve => {
		setTimeout(() => resolve(value), secs*1000)
	})
}

function f1() {
	return new Promise((resolve, reject) => {
		resolve(10)
	})
}

function f2() {
	return new Promise((resolve, reject) => {
		delay(2, 20).then(x => resolve(x))  // ou .then(resolve)
	})
}

function f3() {
	return new Promise((resolve, reject) => {
		resolve(delay(3, 30))
	})
}

function f4() {
	return new Promise((resolve, reject) => {
		const pri = delay(8, 0)
		const prf = pri.then(r => { throw r })  // ou reject(r)
		resolve(prf)
	})
}

const p1 = f1()
p1.then(console.log)

const p2 = f2()
p2.then(console.log)

const p3 = f3()
p3.then(console.log)

const p4 = f4()
p4.catch(err => { console.log('error: ', err) })
