$(() => {

// Dynamic table filtering
$('#topics a')
	.click((e) => {
		e.preventDefault();

		const topic = $(e.target).text();

		$(e.target)
			.addClass('selected')
			.siblings('.selected')
			.removeClass('selected')

		$('#news tr').show();

		if(topic != 'All'){

			// Select all tr in #news when it :has() a td eliminating header rows (such as the calendar year)
			// we filter the tr that don't :not :contain the selected topic as "text"
			/* $(`#news tr:has(td):not(:contains("${topic}"))`)
				.hide(); */

			// Selecting all ements that contain the selected topic text in the 4. row (Topic)
			$('#news')
				.find('tr:has(td)')
				.not((i, element) =>
					$(element)
						.children(':nth-child(4)')
						.text() == topic
				)
				.hide();
		}

	})

	// Striping table rows
	// every second row add an alt class
	/* $('#news tr:nth-child(even)')
		.addClass('alt') */

	// every two rows add an alt class
	/* $('#news tbody')
		.each((i, element) => {
			$(element)
				.children()
				.has('td')
				.filter(i => (i % 4) < 2)
				.addClass('alt');
		}) */

	// Combining filtering and striping
/* 	function stripe(){
		$('#news')
			.find('tr.alt')
			.removeClass('alt')
			.end()
			.find('tbody')
			.each((i, element) => {
				$(element)
					.children(':visible')
					.has('td')
					.filter(i => (i % 4) < 2 )
					.addClass('alt');
			})
	}
	stripe();

	$('#topics a')
		.click((e) => {
			e.preventDefault();
			const topic = $(e.target).text();

			$(e.target)
				.addClass('selected')
				.siblings('.selected')
				.removeClass('selected');

			$('#news tr').show();
			if(topic != 'All'){
				$('#news')
					.find('tr:has(td)')
					.not((i, element) =>
						$(element)
							.children(':nth-child(4)')
							.text() == topic
					)
					.hide();
			}

			stripe();
		}); */

});

(($) => {

		// Writing a custom selector plugin

		// $.expr contains jQuery object that looks for instructions
		// element - DOM element
		// index - always 0 -> can't be relied on
		// matches - array countaint the result of the regular expresion that was used to parse this selector
		$.extend($.expr[':'], {
			group(element, index, matches){
				const num = parseInt(matches[3], 10);

				return Number.isInteger(num) &&
					($(element).index() - 1) % (num * 2) < num
			}
		});

})(jQuery);

$(() => {

	function stripe(){
		$('#news')
			.find('tr.alt')
			.removeClass('alt')
			.end()
			.find('tbody')
			.each((i, element) => {
				$(element)
					.children(':visible')
					.has('td')
					//.filter(i => (i % 4) < 2 )
					.filter(':group(3)')
					.addClass('alt');
			})
	}
	stripe();

	$('#topics a')
		.click((e) => {
			e.preventDefault();
			const topic = $(e.target).text();

			$(e.target)
				.addClass('selected')
				.siblings('.selected')
				.removeClass('selected');

			$('#news tr').show();
			if(topic != 'All'){
				$('#news')
					.find('tr:has(td)')
					.not((i, element) =>
						$(element)
							.children(':nth-child(4)')
							.text() == topic
					)
					.hide();
			}

			stripe();
		});

	// jQuery dom selector ( Sizzle ) loops throu all nodes if we have custom jQuery selecotrs as :eq() or :odd or :even
	// if not it uses .getElementsByTagName() then .getElementById() . then querySelecotrAll(),
	// if browsers don't support querySelectorAll() it users .getElementsByTagName() then .getElementById() and so on...

	// jQuery traversal properties
	// jQuery uses .prevObject to look for object before the selector

	/* const $cell = $('#release')
		.addClass('highlight')

	console.log('prevObject', $cell.prevObject); */ // undefined

	/* const $cell = $('#release')
		.nextAll()
		.addClass('highlight')

	console.log('prevObject', $cell.prevObject); */

	// The DOM element stack
	// the .end() pops one element of the end of the stack (same as prevObject)
	$('#release')
		.nextAll()
		.addBack() // when its called it looks back one stack and combines the two elements sets (.nextAll() and .addBack())
		.addClass('highlight')

		// Writing a DOM traversal method plugin
		// match all table cells in the same colum as a given cell

});

(($) => {

	$.fn.column = function(){
			var $cells = $();

			this.each(function(i, element){
				const $td = $(element).closest('td, th');

				if($td.length){

					const colNum = $td[0].cellIndex + 1
					const $columnCells = $td
						.closest('table')
						.find('td, th')
						.filter(`:nth-child(${colNum})`);

					$cells = $cells.add($columnCells);

				}

			});

			return this.pushStack($cells);
		}

})(jQuery);

$( () => {
	$('#news td')
		.click((e) => {
			$(e.target)
				.siblings('.active')
				.removeClass('active')
				.end()
				.column() // our traversal method plugin
				.addClass('active');
		});
});

// We can improve perfomance by chaning and object caching

// Improving perfomance usin chaining
// We loacted the element with the id news once instead of twice and remove the allt class
// from rows that no longer need it
$( () => {

	function stripe(){
		$('#news')
			.find('tr.alt')
			.removeClass('alt')
			.end()
			.find('tbody')
			.each((i, element ) => {
				$(element)
					.children(':visible')
					.has('td')
					.filter(':group(3)')
					.addClass('alt')
			})
	}
	// the first call to .find() pushes table rows into the stack, but the .end() pops
	// this off the stack so that the next .find() call is operating on the news table once again.
	stripe();


	// Improving perfomance with caching

	const $news = $('#news'); // caching selector

	function stripe(){
		$news
			.find('tr.alt')
			.removeClass('alt');
		$news
			.find('tbody')
			.each((i, element) => {
				$(element)
					.children(':visible')
					.has('td')
					.filter(':group(3)')
					.addClass('alt');
			})
	}

	stripe();

});

// EXERCISES
// 1. Modify the table row striping routine so that it gives no class to the first row, a
// class of alt to the second row, and a class of alt-2 to the third row. Repeat this
// pattern for every set of three rows in a section.
// 2. Create a new selector plugin called :containsExactly() that selects elements
// with text content that exactly matches what is put inside the parentheses.
// 3. Use this new :containsExactly() selector to rewrite the filtering code from
// Listing 9.3.
// 4. Create a new DOM traversal plugin method called .grandparent() that moves
// from an element or elements to their grandparent elements in the DOM.
// 5. Challenge: Using http://jsperf.com/ , paste in the content of index.html and
// compare the performance of finding the closest ancestor table element of <td
// id="release"> using the following:
// The .closest() method
// The .parents() method, limiting the result to the first table found
// 6. Challenge: Using http://jsperf.com/ , paste in the content of index.html and
// compare the performance of finding the final <td> element in each row using the
// following:
// The :last-child pseudo-class
// The :nth-child() pseudo-class
// The .last() method within each row (using .each() to loop over the rows)
// The :last pseudo-class within each row (using .each() to loop over the rows)