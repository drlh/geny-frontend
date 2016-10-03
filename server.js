'use strict';

var https 			= require('https');
var fs 				= require('fs');


var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect().use(serveStatic(__dirname));

//connect().use(serveStatic(__dirname)).listen(8080, function(){
//  console.log('Server running on 8080...');
// });

var port = 4444;

var listener = https.createServer({
	key: fs.readFileSync('config/newServer.key'),
	cert: fs.readFileSync('config/server.crt')
}, app).listen(port, function() {
	console.log('Server running on %d...',port);
	// logger.info({"address":listener.address()}, 'The secured EFM-API is running.');
});