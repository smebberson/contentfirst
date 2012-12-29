var express = require('express');
var request = require('request');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/content-first/raw', function (req, res) {

	request('https://raw.github.com/thememphisagency/contentfirst/master/source/raw%20source.html', function (error, response, body) {

		res.send(body);

	});

});

app.listen(3000);

console.log('Listening on port 3000, http://localhost:3000/');