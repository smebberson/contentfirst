# setup coffee-script so we can use coffee script directly
require 'coffee-script'

# load the modules and custom libraries
express = require 'express'
path = require 'path'
childProcess = require 'child_process'
lib = require './lib/lib'

# global variables
phantomPath = path.join __dirname, 'lib/phantom.js'

# init express and set it up
app = express()
app.use express.static __dirname + '/public'

##########
# setup routes
##########

# setup the most basic route
app.get '/api/raw', lib.loadSource, (req, res) ->

	# return the content without processing
	res.send req.contentfirstsource

# setup a dynamic route
app.get '/api/raw/platform/:platforms', lib.loadSource, (req, res) ->

	# use PhantomJS to process the document
	childProcess.execFile '/opt/phantomjs/bin/phantomjs', [phantomPath, req.contentfirstsource, '["desktop","tablet","mobile"]', req.params.platforms], (err, stdout, stderr) ->
		# need better error handling here, just temporary
		res.send stdout

##########
# start the app
##########

app.listen 3000
console.log 'Listening on port 3000, http://localhost:3000/'