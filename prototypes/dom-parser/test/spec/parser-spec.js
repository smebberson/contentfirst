describe("Content first DOM-based parser", function() {

	beforeEach(function () {
		allDevices = ['desktop','tablet','mobile'];
		getBasicContent = function (platforms) {
			return '<p>Generic content</p><ef platform="' + platforms + '"><p>Exclude from ' + platforms + ' platforms.</p></ef>';
		}
	});

	describe("Excludes", function() {
	  
		it("mobile platform", function() {

			var basicContent = getBasicContent('mobile');
			expect(processContentFirst(basicContent, allDevices, 'mobile')).toEqual('<p>Generic content</p>');

		});

		it("tablet platform", function() {
			
			var basicContent = getBasicContent('tablet');
			expect(processContentFirst(basicContent, allDevices, 'tablet')).toEqual('<p>Generic content</p>');

		});

		it("desktop platform", function() {
			
			var basicContent = getBasicContent('desktop');
			expect(processContentFirst(basicContent, allDevices, 'desktop')).toEqual('<p>Generic content</p>');

		});

		it("multiple platforms", function() {
			
			var basicContent = getBasicContent('mobile,tablet');
			expect(processContentFirst(basicContent, allDevices, 'mobile')).toEqual('<p>Generic content</p>');

		});

		it("ignores platforms", function() {
			
			var basicContent = getBasicContent('mobile,tablet');
			expect(processContentFirst(basicContent, allDevices, 'desktop')).toEqual(basicContent);

		});

	});

});