const express = require('express');
const session = require('express-session');
const app = express();

const FileStore = require('session-file-store')(session);

app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'iselleirt',
	store: new FileStore()
}));

app.use(express.json());

const auth = require('passport');
app.use(auth.initialize()); 
app.use(auth.session()); 

const users = {
	admin: { username: 'admin', password: 'admin' },
	isel:  { username: 'isel',  password: 'leirt' },
	guest: { username: 'guest', password: '1234'  },
}

function userToRef(user, done) {
	done(null, user.username);
}

function refToUser(userRef, done) {
	const user = users[userRef]; 
	if (user) {
		done(null, user);
	} else {
		done('User unknown');
	}
}

auth.serializeUser(userToRef);
auth.deserializeUser(refToUser);

app.get('/', (req, res) => {
	if (req.isAuthenticated()) {
		 res.send(`Hello ${req.user.username}`);
	} else {
		res.send('ISEL - LEIRT - PI');
	}
}); 

app.post('/login', (req, res) => { 
	const username = req.body.username; 
	const password = req.body.password;
	if (isValidUser(username, password)) {
		req.login({
			username: username,
			password: password
		}, (err, result) => {
			// TO DO : handle unexpected error
			res.redirect('/');
		});
	} else {
		res.status(401).send('Invalid user');
	}
	
	function isValidUser(username, password) {
		return users[username] && users[username].password === password;
	}
}); 

app.post('/logout', (req, res) => {
	req.logout();
	req.session.save(() => { // ensure session data is persisted before redirect
		res.redirect('/');
	})
});

const PORT = 8888;
app.listen(PORT, () => console.log(`Server listening on port http://localhost:${PORT}/`))
