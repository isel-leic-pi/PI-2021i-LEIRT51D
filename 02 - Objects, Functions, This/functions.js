'use strict';

function func1(a, b, c, d) {
	console.log(`a: ${a}`)
	console.log(`b: ${b}`)
	console.log(`c: ${c}`)
	console.log(`d: ${d}`)
	console.log()
}

func1(1, 2, 3, 4)
func1(1, 2, 3)
func1(1, 2)
func1(1)
func1()
func1(1, 2, 3, 4, 5, 6, 7)

console.log('\n========\n')

function func2(a, b) {
	const xb = b || -1
	console.log(a + xb)
}

func2(3, 5)
func2(3)

console.log('\n========\n')

const func3 = function (a, b) { return a + b }

console.log(func3(2, 3))
console.log(func3(4, 5))
console.log(typeof func3)

const func4 = (a, b) => a + b

console.log(func4(2, 3))
console.log(func4(4, 5))
console.log(typeof func4)

console.log('\n========\n')

const x = [ 5, 10, 15, 20 ]

const y = x.map(v => v * 3)

console.log(y)

console.log('\n========\n')

function makeFunctionAddingN(n) {
	return function (x) {
		return x + n
	}
}

const fa3 = makeFunctionAddingN(3)
const fa5 = makeFunctionAddingN(5)

console.log(fa3(1))
console.log(fa3(2))
console.log(fa3(3))

console.log(fa5(1))
console.log(fa5(2))
console.log(fa5(3))

console.log()

function getOper(op, term) {
	switch (op) {
		case '+': return v => v + term
		case '*': return v => v * term
		default : return () => 0
	}
}

const fp3 = getOper('+', 3)
const fm2 = getOper('*', 2)
const fer = getOper('z', 6)

console.log(fp3(1))
console.log(fp3(2))
console.log(fp3(3))

console.log(fm2(1))
console.log(fm2(2))
console.log(fm2(3))

console.log(fer(78))

console.log('\n========\n')

const console_log = console.log

console.log('console.log works')

console.log = function() {}

console.log("console.log doesn't work")

console.log = console_log

console.log('console.log works again')
