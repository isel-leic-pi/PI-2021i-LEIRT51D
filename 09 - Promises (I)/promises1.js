'use strict'

function getSchool(done) {
	setTimeout(() => {
		done('isel')
	}, 3000)
}

function getYear(done) {
	setTimeout(() => {
		done((new Date()).getFullYear())
	}, 1500)
}

function format(txt, done) {
	setTimeout(() => {
		done(txt.toUpperCase())
	}, 2000)
}

function concat(part1, part2, done) {
	setTimeout(() => {
		done(part1.toString() + ' - ' + part2.toString())
	}, 2000)
}

// ========

//getSchool(school => { console.log(school) })
//getSchool(console.log)

// Prob. 1 : Aguardar por múltiplos resultados
let pendingOps = 2
function tryFinish() {
	if (--pendingOps == 0) {
		console.log()
	}
}
getSchool(school => { console.log(school); tryFinish() })
getSchool(school => { console.log(school); tryFinish() })

// Prob. 2 : Indentação escadeada
getSchool(school => {
	format(school, formattedSchool => {
		getYear(year => {
			concat(formattedSchool, year, result => {
				console.log(result)
			})
		})
	})
})

// Prob. 3 : Propagação de erros

function hasError() { return false }

function getSchoolX(done) {
	setTimeout(() => {
		if (!hasError())
			done(undefined, 'isel')
		else 
			done(new Error(/* some description */))
	}, 3000)
}

function getYearX(done) {
	setTimeout(() => {
		if (!hasError())
			done((new Date()).getFullYear())
		else 
			done(new Error(/* some description */))
	}, 1500)
}

getSchoolX((errSchool, school) => {
	if (!errSchool)
		format(school, formattedSchool => {
			getYearX((errYear, year) => {
				if (!errYear)
					concat(formattedSchool, year, result => {
						console.log(result)
					})
				else 
					console.log('Year error:', errYear)
			})
		})
	else 
		console.log('School error:', errSchool)
})
