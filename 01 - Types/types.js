"use strict";  // usar sempre em PI

const msg = "Hello, world!";

console.log(msg);


console.log("========");


const a = 1;

let b = 2;

// a = 3;  // não é possível 
b = 3;


console.log(a);
console.log(b);


console.log("========");

const v01 = 1;

console.log(v01);
console.log(typeof v01);

const v02 = 3.141592654;

console.log(v02);
console.log(typeof v02);

const v03 = 5 | 0xA;

console.log(v03);
console.log(typeof v03);

const v04 = 0xaaaaaaaaaaaaaa;

console.log(v04);
console.log(v04.toString(16));
console.log(typeof v04);

const v05 = "hello";

console.log(v05);
console.log(typeof v05);

const v06 = 'a';

console.log(v06);
console.log(typeof v06);

const v07 = 'hello, "world"';

console.log(v07);
console.log(typeof v07);

const v08 = `hello, ${ 2019 + v01 }`;

console.log(v08);
console.log(typeof v08);

const v09 = true;

console.log(v09);
console.log(typeof v09);

const v10 = false;

console.log(v10);
console.log(typeof v10);

const v11 = null;

console.log(v11);
console.log(typeof v11);

let v12;

console.log(v12);
console.log(typeof v12);

const v13 = function (a, b) { return a + b; };

console.log(v13);
console.log(v13(3, 4));
console.log(typeof v13);

