var http = require('http');
var fs   = require('fs');
var path = require('path');
var mime = require('mime');
var router = require("./router");
var chat_server = require("./lib/chat_server");

var server = http.createServer(router.route);
server.listen(8080);
chat_server.createChat(server);

console.log('Server running at http://127.0.0.1:8080/');