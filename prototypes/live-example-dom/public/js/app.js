
var sRaw;
var aPossibleDevices = ['desktop', 'tablet', 'mobile'];

$(document).ready(function () {

	// wire up event handlers
	$('input[name="devices"]').click(function (evt) {

		var processed = processContentFirst(sRaw, aPossibleDevices, $('input[name="devices"]:checked').val());

		// update the container with the raw source
		$('#hidden-container').html(sRaw);
		$('#filtered-content-container').html(processed);
		$('#processed-source-container pre').text(processed);
	});

	// load in the source from github
	$.ajax({
		url: '/src/example.html',
		dataType: 'html'
	}).done(function (data) {
		$('#filtered-content-container').html(sRaw = data);
		$('#content-source-container pre').text(sRaw);
	});

});