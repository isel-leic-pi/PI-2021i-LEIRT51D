'use strict';

const net = require('net');
const watcher = require('./watcher.js');

const pathname = process.argv[2] || '.';

const clients = [];

const server = net.createServer(connection => {
	console.log(
		'New connection from',
		`${connection.remoteAddress}:${connection.remotePort}`
	);
	clients.push(connection);
});

server.listen(8888);

console.log('Waiting for connections...');

watcher.watch(pathname, (evt, name) => {
	broadcast(`[${pathname}] ${evt} ${name}`);
});

function broadcast(msg) {
	clients.forEach(conn => {
		if (!conn.destroyed) {
			conn.write(msg);
			conn.write('\r\n');
		}
	});
}