'use strict';

const net = require('net');

const reader = require('readline');

const client = net.createConnection({ port: 8888 });

const input = reader.createInterface(process.stdin);

input
	.on('line', line => { if (line === '##exit') client.destroy(); else client.write(line); })
	.on('close',  () => { client.destroy(); });

client
	.on('data', data => { console.log(data.toString()); })
	.on('close',  () => { console.log(':: DONE ::'); process.exit(); });
