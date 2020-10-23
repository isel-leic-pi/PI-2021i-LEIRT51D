'use strict';

const net = require('net');

const server = net.createServer(connection => {
	console.log(
		'New connection from',
		`${connection.remoteAddress}:${connection.remotePort}`
	);
	connection.on('data', data => {
		console.log('data:', data.toString());
		connection.write(data);
	});
	connection.on('close', () => {
		console.log(
			'Closed connection from',
			`${connection.remoteAddress}:${connection.remotePort}`
		);
	});
});

server.listen(8888);
