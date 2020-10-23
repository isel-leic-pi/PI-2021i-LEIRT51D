'use strict';

function Point(x, y) {
	this.x = x
	this.y = y

	/*
	this.show = () => { 
		console.log(`{ x: ${this.x}; y: ${this.y} }`)
	}
	*/
}

Point.prototype.show = function () { 
	console.log(`{ x: ${this.x}; y: ${this.y} }`)
}

const p1 = new Point(3, 4)
const p2 = new Point(5, 6)

p1.show = function () { 
	console.log(`{ Point | x: ${this.x}; y: ${this.y} }`)
}

p1.show()
p2.show()

console.log(p1.constructor)
console.log(p2.constructor)
console.log('str'.constructor)
console.log(1..constructor)

console.log('\n========\n')

const str1 = 'LEIRT'
const str2 = 'PI'

String.prototype.prepend = function(prefix) {
	return prefix + this;
}

console.log(str1.prepend('ISEL'))
console.log(str2.prepend('ISEL'))

console.log('\n========\n')

const obj = {
	ref: 42,
	
	oper1: (x) => { 
		console.log(`{ ref: ${this.ref}; x: ${ x } }`)
	},

	oper2: function (x) { 
		console.log(`{ ref: ${this.ref}; x: ${ x } }`)
	}, 
	
	oper3: function (items) { 
		console.log(items.filter(
			v => v < this.ref
		))
	},

	oper4: function (items) { 
		console.log(items.filter(
			function (v) { return v < this.ref }
		))
	} 
	
}

obj.oper1(3)
obj.oper2(5)

obj.oper3([1, 3, 24, 56, 78, 92, 12, -12, 0, 101])
obj.oper4([1, 3, 24, 56, 78, 92, 12, -12, 0, 101])
