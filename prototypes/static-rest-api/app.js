// Generated by CoffeeScript 1.4.0
(function() {
  var app, childProcess, express, lib, path, phantomPath;

  require('coffee-script');

  express = require('express');

  path = require('path');

  childProcess = require('child_process');

  lib = require('./lib/lib');

  phantomPath = path.join(__dirname, 'lib/phantom.js');

  app = express();

  app.use(express["static"](__dirname + '/public'));

  app.get('/api/raw', lib.loadSource, function(req, res) {
    return res.send(req.contentfirstsource);
  });

  app.get('/api/raw/platform/:platforms', lib.loadSource, function(req, res) {
    return childProcess.execFile('/opt/phantomjs/bin/phantomjs', [phantomPath, req.contentfirstsource, '["desktop","tablet","mobile"]', req.params.platforms], function(err, stdout, stderr) {
      return res.send(stdout);
    });
  });

  app.listen(3000);

  console.log('Listening on port 3000, http://localhost:3000/');

}).call(this);
