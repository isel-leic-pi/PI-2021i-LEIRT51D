//"use strict";  // usar sempre em PI

const msg = "Hello, world!";

console.log(msg);


console.log("========");


a = 1;          // não usar
var b = 2;      // não usar

function func1() {
	c = 3;      // não usar
}

function func2() {
	var d = 4;  // não usar
}

func1();
func2();

if (2 < 3) {
	var e = 5;  // não usar
}

console.log(a);
console.log(b);
console.log(c);
// console.log(d);
console.log(e);
