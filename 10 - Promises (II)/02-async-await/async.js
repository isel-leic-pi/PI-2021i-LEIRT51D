'use strict'

function f() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(8)
		}, 3000)
	})
}

/*
function use_f_v0() {
	const value = f()
	console.log(value)
	console.log('use_f_v0 done!')
}
*/

function use_f_v1() {
	f().then(value => {
		console.log(value)
		console.log('use_f_v1 done!')
	})
}

async function use_f_v2() {
	const value = await f()
	console.log(value)
	console.log('use_f_v2 done!')
}

console.log(':: BEFORE ::')
use_f_v1()
use_f_v2()
console.log(':: AFTER ::')
