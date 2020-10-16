'use strict';

function f() {
	console.log('this:', this, 'arguments:', arguments) 
}

f('ISEL', 2020)

const obj = { a: 1, b: 2, m: f }

obj.m('ISEL', 2020)

function Point(a, b) {
	this.x = a
	this.y = b
	
	this.show = () => { console.log(`Point(${this.x}, ${this.y})`) }
}

const p1 = new Point(3, 4)

console.log(p1.x)
console.log(p1.y)
p1.show()
console.log(p1.constructor)

console.log('\n========\n')

function viewCtor(v) {
	console.log(v, ':', v.constructor)
}

viewCtor(3)
viewCtor(p1)
viewCtor('ISEL')
viewCtor([1, 2, 3])
viewCtor({ a: 1, b: 2})
viewCtor(true)
