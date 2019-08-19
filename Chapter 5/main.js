$(() => {

	/* $('div.chapter a[href*="wikipedia"]')
		.attr({
			rel: 'external',
			title: 'Learn more at Wikipedia',
			id: index => `wikilink-${index}`
		}); */

	$('div.chapter a[href*="wikipedia"]')
		.attr({
			rel: 'external',
			title: function() {
				return `Learn more about ${$(this).text()} at Wikipedia.`;
			},
			id: index => `wikilink-${index}`
		});

	/***** If data('read') wont show in DOM but will jQuery will register all
	 * clicked elements that have data('read') added on click, if added
	 * with attr('data-render', true/false) it will show elements
	 * If we console.log($([data-render="true"])) it will always show one
	 * element even tho there are multiple clicked.
	 * tl:dr data('read') can be aplication baset (don't need data DOM attribute)  *****/
	$('#hide-read')
		.change((e) => {
			if( $(e.target).is(':checked') ){
				$('.chapter p')
					.filter((i,p) => $(p).data('read'))
					.hide()
			} else {
				$('.chapter p').show();
			}
		})

	$('.chapter p')
		.click((e) => {
			const $elm = $(e.target);

			$elm
				.css(
					'textDecoration',
					$elm.data('read') ? 'none' : 'line-through'
				)
				.data('read', !$(e.target).data('read'));
		})

	// DOM elements properties

	// Get the current value of the "checked" property
	const currentlyChecked = $('.my-checkbox').prop('checked');

	// Set a new value for the "checked" property
	$('.my-checkbox').prop('checked', false);

	// JavaScript text inputs value -> defaultValue property
	// JavaSCript select elements value -> selectedIndex property

	//jQuery

	// Get current value of a text input
	const inputValue = $('#my-input').val();
	// Get the current value of a select list
	const selectValue = $('#my-select').val();
	// Set the value of a single select list
	$('#my-single-select').val('value3');
	// Set the value of a multiple select list
	$('#my-multi-select').val(['value1', 'value2']);

	// .val() has a function for setter argument

	// Creating new elements
	$('<a href="#top">back to top</a>');
	$('<a id="top"></a>');

	// Inserting new elements
	$('<a href="#top">back to top</a>').insertAfter('div.chapter p');
	$('<a id="top"></a>').prependTo('body'); // inserts element inside of other elements

	// .insertBefore() : Adds content outside of and before existing elements
	// .prependTo(): Adds content inside of and bfore existing elements
	// .appendTo(): Adds content inside of and after existing elements
	// .insertAfter(): Adds content outisde of and after existing elements
});