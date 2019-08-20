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

	/* $('span.footnote')
		.insertAfter('#footer')
		.wrapAll('<ol id="notes"></ol>')
		.wrap('<li></li>'); */

	const $notes = $('<ol id="notes"></ol>')
		.insertBefore('#footer');

	/* $('span.footnote')
		.each((i, span) => {
			// Set's the footnote number to the position where it was
			// before appending
			$(`<sup>${i + 1}</sup>`)
				.insertBefore(span)
			$(span)
				.appendTo($notes)
				.wrap('<li></li>')
		}) */

	// Inverted methods
	// $('<p>Hello</p>').appendTo('#container');
	// same as
	// $('#container').append('<p>Hello</p>');

	/* $('span.footnote')
		.each((i, span) => {
			$(span)
				.before(`<sup>${i + 1}</sup>`)
				.appendTo($notes)
				.wrap('<li></li>');
		}); */

	// Creating larger strings with .join()
	var str = 'a' + 'b' + 'c';
	var str = `${'a'}${'b'}${'c'}`;
	var str = ['a', 'b', 'c'].join('');

	$('span.footnote')
		.each((i, span) => {
			$(span)
				.before([
					'<a href="#footnote-',
					i + 1,
					'" id="context-',
					i + 1,
					'" class="context">',
					'<sup>',
					i + 1,
					'</sup></a>'
				].join(''))
			.appendTo($notes)
			.append([
				'&nbsp;(<a href="#context-',
				i + 1,
				'">context</a>)'
			].join(''))
			.wrap('<li></li>')
		});

	// Copying elements
	// .clone(true) copyes events also
	/* $('div.chapter p:eq(0)')
		.clone()
		.insertBefore('div.chapter'); */

	$('span.pull-quote')
		.each((i, span) => {
			$(span)
				.clone()
				.addClass('pulled')
				.find('span.drop')
					.html('&hellip;')
					.end() // returns the state before the call to find()
				.text( (i, text) => text ) // strips tags from text
				.prependTo(
					$(span)
						.parent()
						.css('position', 'relative')
				);
		});

	// To create new elements from HTML, use the $() function

	// To insert new elements inside every matched element, use the following functions:
		// .append(), .appendTo(), .prepend(), .prependTo()

	// To insert new elements adjacent to every matched element, use the following functions:
		// .after(), .insertAfter(), .before(), .insertBefore()

	// To insert new elements around every matched element, use the following functions:
		// .wrap(), .wrapAll(), .wrapInner()

	// To replace every matched element with new elements or text, use the following functions:
		// .html(), .text(), .replaceAll(), .replaceWith()

	// To remove elements inside every matched element, use the following function:
		// .empty()

	// To remove every matched element and descendants from the document without actually deleting them, use the following functions:
		// .remove(), .detach()

	// EXERCISES
	// 1. Alter the code that introduces the back to top links, so that the links only appear after the fourth paragraph.
	$('a[href="#top"]')
		.remove(); // removing top elements

	$('<a href="#top">back to top</a>')
		.insertAfter('div.chapter p:gt(3)');

	// 2. When a back to top link is clicked on, add a new paragraph afther the link
	// containing the message You were here. Ensure the link still works.
	$( 'a[href="#top"]' )
		.click( function() {
			console.log($(this));
			$( this ).after( '<p>You were here.</p>' );
		});

	// 3. When the author's name is clicked, turn it bold (by addint an element, rather than manuplating classes or CSS attribtues).
	/* $( '#f-author' ).click( function() {
		$(this).wrap('<b></b>');
	}); */

	// 4. On a subseqent click of the bolded author's name, remove the <b> element
	// that was added (therby toggling between bold and normal text).
	$( '#f-author' ).click( function() {
		if( $(this).parent().is("b") )
			$(this).unwrap();
		else
			$(this).wrap('<b></b>');
	});
	// 5. Add a class of inhabitants to each of the chapter's paragraphs
	// without callin .addClass(). Make sure to preserve any existing classes.
	$('.chapter p')
		.each( (i, p) => {
			$( p )
				.attr( 'class', $(p).attr('class')
								? `${$(p).attr('class')} inhabitants`
								: 'inhabitants' )
		})

});