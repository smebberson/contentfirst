
# support the browser and nodejs
top = exports ? window

top.processContentFirst = (html, allDevices, selectedDevice) ->

	'use strict';

	aDevices = allDevices || []
	sSelectedDevice = selectedDevice || []

	# create a new DOM and parse the HTML
	dom = new DOMParser()
	doc = dom.parseFromString(html, 'text/html')

	# retrieve the exclude tags
	aExcludes = nodeListToArray doc.getElementsByTagName('ef')

	# do we have devices to filter on?
	if aDevices.length
		# loop through each exclude tag found
		while node = aExcludes.shift()
			# only process it if it has the attributes platform
			if node.hasAttributes() and node.attributes.platform
				# if its platforms match the current platform, remove the node from the DOM
				if node.parentNode and _find selectedDevice, node.attributes.platform.value.split(',')
					node.parentNode.removeChild(node)

	# return
	doc.getElementsByTagName('body')[0].innerHTML

# turn a node list into an array
nodeListToArray = (nodelist) ->
	tag for tag in nodelist

_find = (term, array) ->
	array.some (val) ->
		val is term

`
/*! @source https://gist.github.com/1129031 */
/*global document, DOMParser*/
 
(function(DOMParser) {
	"use strict";
 
	var
	  DOMParser_proto = DOMParser.prototype
	, real_parseFromString = DOMParser_proto.parseFromString
	;
 
	// Firefox/Opera/IE throw errors on unsupported types
	try {
		// WebKit returns null on unsupported types
		if ((new DOMParser).parseFromString("", "text/html")) {
			// text/html parsing is natively supported
			return;
		}
	} catch (ex) {}
 
	DOMParser_proto.parseFromString = function(markup, type) {
		if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
			var
			  doc = document.implementation.createHTMLDocument("")
			;
 
			doc.body.innerHTML = markup;
			return doc;
		} else {
			return real_parseFromString.apply(this, arguments);
		}
	};
}(DOMParser));
`