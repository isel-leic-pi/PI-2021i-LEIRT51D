'use strict';

const a = { prop1: 1 , prop2: "ISEL" , prop3: true , prop4: 1.3 }

console.log(a)
console.log(typeof a)

const b = [ 3, 5, 88, 123 ]

console.log(b)
console.log(typeof b)

for (let i = 0; i < b.length; ++i) {
	console.log(b[i])
}

for (let p in a) {
	console.log(`${p} : ${ a[p] }`)
}

for (let x in b) {
	console.log(`${x} : ${ b[x] }`)
}
console.log(b.length)

a.prop5 = 'x'
console.log(a)

b[4] = -25
console.log(b)
console.log(b.length)

b[14] = 11
console.log(b)
console.log(b.length)

for (let i = 0; i < b.length; ++i) {
	console.log(b[i])
}

console.log('\n========\n')

function showTrueOrFalse(value) {
	console.log(value, ':', value ? true : false)
}

showTrueOrFalse(false)
showTrueOrFalse(true)
showTrueOrFalse(0)
showTrueOrFalse(1)
showTrueOrFalse(2)
showTrueOrFalse(-11)
showTrueOrFalse(0.0)
showTrueOrFalse(1.35)
showTrueOrFalse(Infinity)
showTrueOrFalse(-Infinity)
showTrueOrFalse(NaN)
showTrueOrFalse([])
showTrueOrFalse([1, 2, 3])
showTrueOrFalse({})
showTrueOrFalse({a:1,b:"X",c:false})
showTrueOrFalse(null)
showTrueOrFalse(undefined)
showTrueOrFalse("abcdef")
showTrueOrFalse("")
