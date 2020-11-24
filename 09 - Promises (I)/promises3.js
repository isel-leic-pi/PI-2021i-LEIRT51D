'use strict'

function getSchool() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('isel')
		}, 3000)
	})
}

function getYear() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve((new Date()).getFullYear())
		}, 1500)
	})
}

function format(txt) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(txt.toUpperCase())
		}, 2000)
	})
}

function concat(part1, part2) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(part1.toString() + ' - ' + part2.toString())
		}, 2000)
	})
}

// ========

//getSchool().then(school => { console.log(school) })
//getSchool().then(console.log)

const p1 = getSchool()
const p2 = getSchool()

p1.then(school => { console.log(school) })
p2.then(console.log)

const p3 = Promise.all([p1, p2])
p3.then(() => { console.log('----') })

// ========

const promisedSchool = getSchool()

const promisedFormattedSchool =
	promisedSchool.then(school => format(school))

const promisedYear = getYear()
	
const promisedParts = Promise.all([
	promisedFormattedSchool, promisedYear
])

const promisedResult =
	promisedParts.then(parts => concat(parts[0], parts[1]))
	
promisedResult.then(result => { console.log(result) })

// ========

Promise.all([
	getSchool().then(format),
	getYear()
])
.then(parts => concat(parts[0], parts[1]))
.then(console.log)
