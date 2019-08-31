// Organizing test
// .module() - general category under which the test will be run
// .test()

/* QUnit.module('Selecting');
	QUnit.test('Child Selector', (assert) => {
	assert.expect(0);
});

QUnit.test('Attribute Selectors', (assert) => {
	assert.expect(0);
});

QUnit.module('Ajax'); */

// Code fails becouse we didnt write code for the horizontal class
QUnit.test('Child Selector', (assert) => {
	assert.expect(1);
	const topLis = $('#selected-plays > li.horizontal');
	assert.equal(topLis.length, 3, 'Top LIs have horizontal class');
})

// Added horizontall class top test passes
$(() => {
	$('#selected-plays > li').addClass('horizontal');
});

QUnit.module('Selecting', {
	beforeEach() {
		this.topLis = $('#selected-plays > li.horizontal');
	}
});

QUnit.test('Child Selector', function(assert) {
	assert.expect(1);
	assert.equal(this.topLis.length, 3,
	'Top LIs have horizontal class');
});

QUnit.test('Attribute Selectors', function(assert) {
	assert.expect(2);
	assert.ok(this.topLis.find('.mailto').length == 1, 'a.mailto');
	assert.equal(this.topLis.find('.pdflink').length, 1, 'a.pdflink');
});

(() => {
	$('#selected-plays > li').addClass('horizontal');
	$('a[href^="mailto:"]').addClass('mailto');
	$('a[href$=".pdf"]').addClass('pdflink');
});

// Asynchronous testing

QUnit.test('JSON', (assert) => {

	assert.expect(0);
	const done = assert.async();

	$.getJSON('A.json', (json, textStatus) => {
	// add tests here
	}).always(done);

});

QUnit.test('JSON', (assert) => {

	const backbite = {
		term: 'BACKBITE',
		part: 'v.t.',
		definition: "To speak of a man as you find him when he can't find you."
	};

	assert.expect(2);
	const done = assert.async();

	$.getJSON('A.json', (json, textStatus) => {
		assert.equal(textStatus, 'success', 'Request successful');
		assert.deepEqual(
			json[1],
			backbite,
			'result array matches "backbite" map'
		);
	}).always(done);
});

// Other types of tests
// Numbers - notEqual() and notDeepEqual(), strictEqual(), throws()

// MORE INFO AT http://qunitjs.com/

// Fnctional testing framewokrs http://mwbrooks.github.io/dominator.js/, http://funcunit.com/
// Futher automate tets conjuction with those frameworks http://seleniumhq.org/

// Further reading
// Introduction to unit testing ( http://qunitjs.com/intro/ )
// QUnit Cookbook ( http://qunitjs.com/cookbook/ )
// The jQuery Test-Driven Development article by Elijah Manor ( http://msdn.microsoft.com/en-us/scriptjunkie/ff452703.aspx )
// The Unit Testing Best Practices article by Bob McCune ( http://www.bobmccune.com/2006/12/09/unit-testing-best-practices/ )

// BOOKS
// Test Driven Development: By Example, Kent Beck
// The Addison Wesley Signature Series
// Test-Driven JavaScript Development, Christian Johansen, Addison Wesley.