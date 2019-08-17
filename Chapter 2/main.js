$( () => {

	$( '#selected-plays > li' )
	.addClass('horizontal');

	// li don't have hrozontal class
	$( '#selected-plays li:not(.horizontal)' )
	.addClass( 'sub-level' );

	// li with no sub-level class
	$( '#selected-plays li:not(.sub-level)' )
	.addClass( 'big-letter' );

	// a href starts with mailto:
	$( 'a[href^="mailto:"]' )
	.addClass( 'mailto' );

	// a href ends with .pdf
	$( 'a[href$=".pdf"]' )
	.addClass( 'pdflink' );

	// a href starts with http and end contains henry
	$( 'a[href^="http"][href*="henry"]' )
	.addClass( 'henrylink' );

	// selects second (in DOM) horizontal list ( 0 based selector )
	$('li.horizontal:eq(1)');

	/*
		selects even
		tr ( starts from 0 so every odd row is selected
		( secound row is one (odd) ) )
	*/
	//$( 'tr:even' ).addClass( 'alt' );

	// selects every tr nth-child (td) that is odd
	$( 'tr:nth-child(odd)' )
	.addClass( 'alt' );

	// search by element contains text
	/* $( 'td:contains(Henry)' )
	.addClass('highlight'); */

	// adds external class to every a element that has host hostname and host name is not current location
	$( 'a' )
	.filter( (i, a) => a.hostname && a.hostname !== location.hostname )
	.addClass( 'external' );

	// seach element by text and adds class to next sibling of it (History)
	$( 'td:contains(Henry)' )
	.next()
	.addClass( 'highlight' )

	//FORM SELECTORS
	/*
		:input -> Input, text area, select, and button elements
		:button -> Button elements and input elements with a type attribute equal to button
		:enabled -> Form elements that are enabled
		:disabled -> Form elements that are disabled
		:checked -> Radio buttons or checkboxes that are checked
		:selected -> Option elements that are selected
	*/

	// selects all next siblings and to include Henry part we set addBack()
	$( 'td:contains(Henry)' )
	.nextAll()
	.addBack()
	.addClass( 'highlight' )

	// select every cell in row
	$( 'td:contains(Henry)' )
	.parent()
	.children()
	.addClass( 'highlight' )

	// Writing types and chaining (not recommended)
	$( 'td:contains(Henry)' ).parent().find( 'td:eq(1)' )
	.addClass( 'highlight' ).end().find( 'td:eq(2)' )
	.addClass( 'highlight' )

	$( 'td:contains(Henry)' ) // Find every cell containing "Henry"
	.parent() // Select its parent
	.find( 'td:eq(1)' ) // Find the 2nd descendant cell
	.addClass( 'highlight' ) // Add the "highlight" class
	.end() // Return to the parent of the cell containing "Henry"
	.find( 'td:eq(2)' ) // Find the 3rd descendant cell
	.addClass( 'highlight' ) // Add the "highlight class"

	// Iterating throught elments (each is to much for this task)

	// BAD
	const eachText = [];

	$( 'td' )
	.each( (i, td) => {
		if( td.textContent.startsWith('H') ){
			eachText.push( td.textContent );
		}
	})

	// GOOD
	const forText = [];

	for( let td of $( 'td' ) ){
		if( td.textContent.startsWith( 'H') ){
			forText.push( td.textContent )
		}
	}

	//Get
	$('#my-element').get(0);
	//Shorthand get
	$('#my-element')[0];

	// EXCERCISE
	// 1. Add a class of special to all of the <li> element at the second level o fthe nested list
	$( 'li ul > li' ).addClass( 'special' );
	// 2. Add a class of year to all table cells in the third column of a table
	$( 'td:nth-child(3)' ).addClass( 'year' );
	// 3. Add the class special to the first table row that has the word Tragedy in it.
	$( 'tr:contains(Tragedy)' ).first().addClass( 'special' );
	// 4. Select all the list items (<li>) containing a link (<a>). Add the class afterlink to the sibling list items that follow the ones selected
	$( 'li > a').parent().nextAll().addClass( 'afterlink');
	// 5. Add a class tragedy to the closest ancestor <ul> of any .pdf link
	$( 'a[href$=".pdf"]' ).closest('ul').addClass( 'tragedy' );

});