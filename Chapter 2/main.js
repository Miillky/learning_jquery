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
	$( 'tr:nth-child(odd)' ).addClass( 'alt' );
});