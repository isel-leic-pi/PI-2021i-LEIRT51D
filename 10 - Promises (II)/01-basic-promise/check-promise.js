'use strict'

const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('DONE!')
		console.log('P1 fulfilled')
	}, 2000)
})

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject('REJECTED!')
		console.log('P2 rejected')
	}, 3000)
})

console.log(':: RUNNING ::')

p1.then(str => console.log('P1 handler 1', str))
p1.then(str => console.log('P1 handler 2', str))
p1.then(str => console.log('P1 handler 3', str))
p1.catch(str => console.log('P1 handler 4', str, '[THIS WILL NOT RUN]'))

p2.catch(str => console.log('P2 handler 1', str))
p2.catch(str => console.log('P2 handler 2', str))
p2.catch(str => console.log('P2 handler 3', str))
//p2.then(str => console.log('P2 handler 4', str, '[THIS WILL NOT RUN]'))
/* error not processed; will generate an error message */
 
console.log('.. handlers ready ..')

setTimeout(() => {
	console.log('.. CONTINUING ..')
	
	p1.then(str => console.log('P1 handler 5', str))
	p2.catch(str => console.log('P2 handler 5', str))
	
}, 4000)

