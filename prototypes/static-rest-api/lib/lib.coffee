request = require 'request'

exports.loadSource = (req, res, next) ->

	cache = {}

	if not cache.contentfirstsource

		request 'https://raw.github.com/thememphisagency/contentfirst/master/source/raw%20source.html', (error, response, body) ->
			cache.contentfirstsource = body
			req.contentfirstsource = cache.contentfirstsource
			next();

	else

		req.contentfirstsource = cache.contentfirstsource
		next();