'use strict'

const express = require('express');
const session = require('express-session');

const FileStore = require('session-file-store')(session);

const app = express();

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: 'iselleirt',
	store: new FileStore()
}));

app.get('/', (req, res) => { 
	res.send('ISEL - LEIRT - PI'); 
}); 

// This example breaks several HTTP principles.
// Do not use as inspiration.
app.get('/save', (req, res) => {
	const key = req.query.key;
	const val = req.query.val;
	if (key && val) {
		if (!req.session.mem) {
			req.session.mem = {}
		}
		req.session.mem[key] = val;
		res.send(`SET '${key}' := '${val}'`);
	} else {
		res.status(400).send('Invalid save request.');
	}
});

app.get('/mem', (req, res) => {
	res.send(req.session.mem || {});
});

const PORT = 8888;
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}/`))
