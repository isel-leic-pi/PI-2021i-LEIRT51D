'use strict';

const net = require('net');

const clients = [];

const server = net.createServer(connection => {
	console.log(
		'New connection from',
		`${connection.remoteAddress}:${connection.remotePort}`
	);
	clients.push(connection);
});

setInterval(() => { broadcast('ISEL - LEIRT - PI'); }, 5000);

server.listen(8888);

console.log('Waiting for connections...');

function broadcast(msg) {
	clients.forEach(conn => {
		if (!conn.destroyed) {
			conn.write(msg);
			conn.write('\r\n');
		}
	});
}