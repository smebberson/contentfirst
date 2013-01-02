var system = require('system');
var page = require('webpage').create();

// the information to pass to processContentFirst comes in the form of arguments
var content = system.args[1];
var allDevices = JSON.parse(system.args[2]);
var selectedDevice = system.args[3];

// add the content first JavaScript
page.includeJs('https://raw.github.com/thememphisagency/contentfirst/master/prototypes/dom-parser/parser.js', function (val) {

	// run the processContentFirst function passing in the HTML to process
	pc = page.evaluate(function (content, allDevices, selectedDevice) {

		return processContentFirst(content, allDevices, selectedDevice);

	}, content, allDevices, selectedDevice);

	// return the processed HTML
	console.log(pc);

	// obvious
	phantom.exit();

});