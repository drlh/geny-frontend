'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect().use(serveStatic(__dirname));

connect().use(serveStatic(__dirname)).listen(8080, function(){
  console.log('Server running on 8080...');
 });

