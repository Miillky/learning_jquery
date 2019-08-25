/***** jQuery object function - plugins *****/
(($) => {

/* 	$.sum = array =>

		array.reduce(
			(result, item) =>
				parseFloat($.trim(item)) + result, 0
		);

	$.averge = array =>
		Array.isArray(array) ?
			$.sum(array) / ( array.length) : ''; */

	// We can extend the global jQuery object to create the same functions
/* 	$.extend({
		sum: array =>
			array.reduce(
				(result, item) =>
					parseFloat($.trim(item)) + result, 0
			),
			averge: array =>
				Array.isArray(array) ?
					$.sum(array) / array.length :
					''
	});
 */
	// Isolatin function within namespaces
	/* $.mathUtils = {
		sum: array =>
			array.reduce(
				(result, item) =>
					parseFloat($.trim(item)) + result, 0
			),
		averge: array =>
			Array.isArray(array) ?
				$.mathUtils.sum(array) / ( array.length) : ''
	} */
	// Commented because it's copyed in jquery.mathutils.js file


})(jQuery);

$(() => {

	const quantities = $('#inventory tbody')
		.find('td:nth-child(2)')
		.map((index, qty) => $(qty).text())
		.get() // or [...quantites], get() without a parameter sets all node objects to an array

		//const sum = $.sum(quantities);
		const sum = $.mathUtils.sum(quantities);

		$('#sum')
			.find('td:nth-child(2)')
			.text(sum);

	const $inventory = $('#inventory tbody');
	const prices = $inventory
		.find('td:nth-child(3)')
		.map((index, qty) => $(qty).text())
		.get();

	//const averge = $.averge(prices);
	const averge = $.mathUtils.averge(prices);

	$('#average')
		.find('td:nth-child(3)')
		.text(averge.toFixed(2));

})

// Adding jQuery object methods

// jQuery.fn object is an alias to jQuery.prototype provided for conciseness.
jQuery.fn.myMethod = function(){
	console.log('Nothing happens.');
}

$(() => {

	// calling the jQuery.fn.myMethod, method
	$('div').myMethod();

});

// Object method context
// Within any plugin method the keyword this is set to the curretnt jQuery object. (needs to be a function($) not =>)
(function($){

	// if we set it to a $('tr') it will match the first matched table row se we need to implicit iteration with each method
	/* $.fn.swapClass = function(class1, class2){
		if(this.hasClass(class1)){
			this
				.removeClass(class1)
				.addClass(class2);
		} else if(this.hasClass(class2)){
			this
				.removeClass(class2)
				.addClass(class1);
		}
	} */

	// Implicit iteration
	$.fn.swapClass = function(class1, class2){
		// without return we can not chain chain so we need to return the result of each
		return this
			.each((i, element) => {
				const $element = $(element);

				if($element.hasClass(class1)){

					$element
						.removeClass(class1)
						.addClass(class2)

				} else if($element.hasClass(class2)){

					$element
						.removeClass(class2)
						.addClass(class1);

				}
			});
	}

})(jQuery)

$(() => {
	$('table')
		.click(() => {
			$('tr').swapClass('one', 'two');
		})
});

// Providing flexible method parameters
(function($){

	$.fn.shadow = function(opts){

		//Default parameters values
		// These defaults need to be customizable so we need to set the appart form the function
		/* const defaults = {
			copies: 5,
			opacity: 0.1,
			// Callback functions
			copyOffset: index => ({
				x: index,
				y: index
			})
		}; */

		// $.extend() lets us take opts object provided as argument and use it to create a new object using defaults when necesary.
		// It merges any object passed to it into the first argument
		//const options = $.extend({}, defaults, opts) -> with the defaults inside the function

		const options = $.extend({}, $.fn.shadow.defaults, opts); // with customizable defaults outside the funciton

		return this.each((i, element) => {
			const $originalElement = $(element);

			for(let i = 0; i < options.copies; i++){
				// With the copyOffset function
				const offset = options.copyOffset(i)

				$originalElement
					.clone()
					.css({
						position: 'absolute',
						// Without the defaults copyOffset function
					/* 	left: $originalElement.offset().left + i,
						top: $originalElement.offset().top + i, */
						left: $originalElement.offset().left + offset.x,
						top: $originalElement.offset().top + offset.y,
						margin: 0,
						zIndex: -1,
						opacity: options.opacity
					})
					.appendTo('body');
			}
		})
	}

	$.fn.shadow.defaults = {
		copies: 5,
		opacity: 0.1,
		copyOffset: index => ({
			x: index,
			y: index
		})
	};

})(jQuery);

$(() => {
	/* $('h1').shadow({
		copies: 3,
		opacity: 0.25
	}); */

	// it will use opacity 0.25 because its alredy defined in an object before
	// the extend() function merges the objects to have opacity alredy set
	/* $('h1')
		.shadow({
			copies: 3
		}); */

	// the extend() method accepst null values so it can be without parameters
	//$('h1').shadow();

	// with the copyOffset function
	/* $('h1')
		.shadow({
			copyOffset: index => ({
				x: -index,
				y: -2 * index
			})
		}) */

	// with customizable defaults
	$.fn.shadow.defaults.copies = 10;
	$('h1')
		.shadow({
			copyOffset: index => ({
				x: -index,
				y: index
			})
		})

});

// Creating plugins with the jQuery UI widget factory
// creting a plugin with the $.widget() factory method
// Features:
// - The plugin becomes stateful, meaning that we can examine, alter, or even
// completly reverse the effects of the plugin after it has been applied
// - User-suplied option are merged with customizable default options automatically
// - Multiple plugin methods are seamlessly combined into a single jQuery method,
// accepting a string to identify which submethod is being called
// Custom event handlers triggered by the plugin get access to the widget instance's data

// Creating a widget - creating a tooltip method (this method will override the bild-in .tooltip() method)

(($) => {

	$.widget('ljq.tooltip', {

		// Accepting widget options
		options: {
			offsetX: 10,
			offsetY: 10,
			content: element => $(element).data('tooltip-text')
		},

		// functions with _ are private
		// custom in method
		_create(){
			this._tooltipDiv = $('<div/>')
				.addClass([
					'ijq-tooltip-text',
					'ui-widget',
					'ui-state-highlight',
					'ui-corner-all'
				].join(' '))
				.appendTo('body')
			this.element
				.addClass('ijq-tooltip-trigger')
				.on('mouseenter.ijq-tooltip', () => { this._open(); })
				.on('mouseleave.ijq-tooltip', () => { this._close(); });
		},
		// public method
		destroy(){
			this._tooltipDiv.remove();
			this.element
				.removeClass('ijq-tooltip-trigger')
				.off('.ijq-tooltip');
			this._superApply(arguments) // the _super() and _superApply() methods call the base widget methods of the same name
		},
		// custom method
		_open(){
			// Enabling and siabling widgets
			if(this.options.disabled){
				return;
			}
			const elementOffset = this.element.offset();
			this._tooltipDiv
				.css({
					position: 'absolute',
					// without options
					/* left: elementOffset.left,
					top: elementOffset.top + this.element.height() */
					// with options
					left: elementOffset.left + this.options.offsetX,
					top:
						elementOffset.top +
						this.element.height() +
						this.options.offsetY
				})
				// without options
				// .text(this.element.data('tooltip-text'))
				// with options
				.text(this.options.content(this.element))
				.show();
			// Triggering widget events
			this._trigger('open')
		},
		// custom method
		_close(){
			this._tooltipDiv.hide();
			// Triggering widget events
			this._trigger('close');
		},
		// public method
		open(){
			this._open();
		},
		// public method
		close(){
			this._close();
		}
	})

})(jQuery)

$(() => {
	// without options
	$('a').tooltip();
	// destroying tooltip
	$('a').tooltip('destroy');
	// seting options
	$('a').tooltip({offsetX: -10, offsetX: 25 });
	// seting options after tooltip is called
	$('a').tooltip().tooltip('option', 'offsetX', 20);
	// open
	$('a').tooltip('open');
	// close
	$('a').tooltip('close');

});

// Plugin design recommendation
/*
1. Protect the dollar ( $ ) alias from potential interference from other libraries by
using jQuery instead or passing $ into an IIFE, so that it can be used as a local
variable.

2. Whether extending the jQuery object with $.myPlugin or the jQuery prototype
with $.fn.myPlugin , add no more than one property to the $ namespace.
Additional public methods and properties should be added to the plugin's
namespace (for example, $.myPlugin.publicMethod or $.fn.myPlugin.pluginProperty ).

3. Provide an object containing default options for the plugin:
$.fn.myPlugin.defaults = {size: 'large'} .

4. Allow the plugin user to optionally override any of the default settings for all
subsequent calls to the method ( $.fn.myPlugin.defaults.size =
'medium'; ) or for a single call ( $('div').myPlugin({size: 'small'}); ).

5. In most cases when extending the jQuery prototype ($.fn.myPlugin ), return
this to allow the plugin user to chain additional jQuery methods to it (for
example, $('div').myPlugin().find('p').addClass('foo') ).

6. When extending the jQuery prototype ( $.fn.myPlugin ), enforce implicit
iteration by calling this.each() .

7. Use callback functions when appropriate to allow for flexible modification of the
plugin's behavior without having to change the plugin's code.

8. If the plugin calls for user interface elements or needs to track elements' state,
create it with the jQuery UI widget factory.

9. Maintain a set of automated unit tests for the plugin with a testing framework
such as QUnit to ensure that it works as expected. See Appendix A for more
information about QUnit.

10. Use a version control system such as Git to track revisions to the code. Consider
hosting the plugin publicly on GitHub ( http://github.com/ ) and allowing
others to contribute.

11. If making the plugin available for others to use, make the licensing terms clear.
Consider using the MIT license, which jQuery also uses.

*/

// EXERCISES
// 1. Create a new plugin method called .slideFadeIn() and .slideFadeOut(),
// combining the opacity animations of .fadeIn() and .fadeOut() with the
// heihg animations of .slideDown() and .slideUp();
(function($){

$.fn.slideFadeIn = function(){
	return this
		.each((i, element) =>
			$(element).slideDown().fadeIn() );
}

$.fn.slideFadeDown = function(){
	return this
		.each((i, element) =>
			$(element).slideUp().fadeOut() );
}

})(jQuery)

$( ()=> {
	$('#inventory').slideFadeDown()
	$('#inventory').slideFadeIn()
})

// 2. Extend the customizability of the .shadow() method so that the z-index of
// the cloned copies can be specified by the plugin user
// just add z-index property to $.fn.shadow.defaults object

// 3. Add a new subethod called isOpen to the tooltip widget.
// This submethod should return true if the tooltip is currently displayed and false otherwise.
// just check if this.element is visible with :visible slector

// 4. Add code that listens for the tooltipopen event that our widget fires and
// logs a message to the console
// in _create method set this._on(this.open, () => console.log('Message') )

// 5. Provide an alternative content option for the tooltip widget that fetches
// the content of the page that an achor's href poits to via Ajax and siplay that content
// as the tooltip text.
// Easy peasy lemon squeezy

// 6. Provide a new effect option for the tooltip widget that, if specified,
// applies the named jQuery UI effect (such as explode ) to the showing and hiding
// of the tooltip.