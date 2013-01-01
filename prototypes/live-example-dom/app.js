var static = require('node-static');

var publicfiles = new (static.Server)('./public', {cache: false});

require('http').createServer(function (request, response) {

	request.addListener('end', function () {
		publicfiles.serve(request, response);
	});

}).listen(8080);

console.log('Navigate to http://localhost:8080/.');