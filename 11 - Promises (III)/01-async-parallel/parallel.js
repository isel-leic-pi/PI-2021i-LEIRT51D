'use strict'

function delay(secs, value) {
	return new Promise(resolve => {
		setTimeout(() => resolve(value), secs*1000)
	})
}

async function f1(startValue, initialDelay) {
	console.log(`:: f1(${startValue}) ::`)
	let currentValue = await delay(initialDelay, startValue)
	for (let i = 0; i < 3; ++i) {
		const newValue = currentValue + 1
		console.log(`:: f1(${newValue}) ::`)
		currentValue = await delay(2, newValue)
	}
	return currentValue
}

async function f2(startValue, initialDelay) {
	console.log(`:: f2(${startValue}) ::`)
	const value1 = await delay(initialDelay, startValue + 1)
	console.log(`:: f2(${value1}) ::`)
	const value2 = await delay(initialDelay, value1 + 1)
	console.log(`:: f2(${value1}) ::`)
	const value3 = await delay(initialDelay, value2 + 1)
	console.log(`:: f2(${value1}) ::`)
	return value3
}

const p1 = f1(10, 2)
const p2 = f2(20, 3)
