
// used to process content first text, DOM style
function processContentFirst (html, allDevices, selectedDevice) {

	// define the devices
	var aDevices = (allDevices || []);
	var sSelectedDevice = (selectedDevice || undefined);

	// parse the HTML into a separate DOM
	var dom = new DOMParser();
	var doc = dom.parseFromString(html, 'text/html');

	// we want an array, not a nodelist, because we want to move on from the <ef> once we've evaluated it (regardless if it makes content changes)
	var aExcludes = _.filter(doc.getElementsByTagName('ef'), function () { return true });
	var node;
	var platforms;

	if (aDevices.length) {

		// process the text excluding, including as required
		// devices array contains a list of the devices the platform is required for
		// contexts array contains a list of the contexts to filter on

		// process excludes
		while (node = aExcludes.shift()) {

			// check that the platform attribute is present
			if (node.hasAttributes() && node.attributes.platform) {

				// probably not neccessary, but allow ef.platform properties to include multiple platforms
				platforms = node.attributes.platform.value.split(',');

				// remove any <ef> that names the current platform
				if (node.parentNode && _.find(platforms, function (val) { return val === sSelectedDevice })) node.parentNode.removeChild(node);

			}

		}

	}

	// the DOM includes <head>, but we only want to return <body>
	return doc.getElementsByTagName('body')[0].innerHTML;

}

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