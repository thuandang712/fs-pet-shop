// var fs = require('fs');
// var path = require('path');
// var petsPath = path.join(__dirname, 'pets.json');
// console.log(petsPath)
var routes = require('./routes')

var http = require('http');
var port = process.env.PORT || 8000;

var handleRequest = function (req, res) {
    if(routes[req.url] !== undefined) {
        routes[req.url](req, res);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
};

var server = http.createServer(handleRequest)

server.listen(port, function() {
    console.log("Listening on port", port);
});