var http = require('http');
var static = require('node-static');

var fileServer = new static.Server('./dist');

http.createServer(function (request, response) {
  request.addListener('end', function () {
    fileServer.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 3000);
