// Advanced DOM Manipulation
// We will sort the table in three seperate jQuery sorting mechanisms.
// - Data extracted from the HTML content
// - HTML5 custom data attributes
// - A JSON representation of the table data

$(() => {

	// Data extracted form the HTML content

	/* // Adding links around existing text
	const $headers = $('#t-1')
		.find('thead th')
		.slice(1) // will not select the 0 index th

	$headers
		.wrapInner($('<a/>').attr('href', '#'))
		.addClass('sort'); */

	// Sorting simple JavaScript arrays with .sort()
	// Examples
	const arr = [52, 97, 3, 62, 10, 63, 64, 1, 9, 3, 4];
	arr.sort(); // returns [1, 10, 3, 3, 4, 52, 62, 63, 64, 9, 97] -> sorted lexicographically (in alphabetical order)

	// Better to sort numerically
	arr.sort((a,b) => a < b ? -1 : (a > b ? 1 : 0) );
	// This function returns a negative number if a should come first in the sorted array, a positive
	// number if b should come first, and zero if the order of the items does not matter.
	// With this information in hand, the .sort() method can sequence the items appropriately: [1, 10, 3, 3, 4, 52, 62, 63, 64, 9, 97]

	// Sorting DOM elements
	// const comparator = (a,b) => a < b ? -1 : ( a > b ? 1 : 0);

	// Sorting DOM elements with direction
	const comparator = (a, b, direction = 1) =>
		a < b ?
			-direction :
			(a > b ? direction : 0)
/* 	const sortKey = (element, column) => $.trim($(element)
		.children('td')
		.eq(column)
		.text()
		.toUpperCase() // because string comparison is case sensitive...
	); */
	// Performing additional pre-computation
	const sortKey = (element, column) => {
		const $cell = $(element)
			.children('td')
			.eq(column);
		const sortText = $cell
			.find('span.sort-key')
			.text(); // sorting author by last name
		const cellText = $cell
			.text()
			.toUpperCase();

		return $.trim(`${sortText} ${cellText}`);
	}

	// sorting by number (remove $) and date by parsing the date
	const sortKeys = {
		date: $cell => Date.parse(`1 ${$cell.text()}`),
		alpha: $cell => $.trim(
			$cell.find('span.sort-key').text() + ' ' +
			$cell.text().toUpperCase()
		),
		numeric($cell){
			const key = parseFloat(
				$cell
					.text()
					.replace(/^[^\d]*/, '')
			);
			return isNaN(key) ? 0 : key;
		}
	}

	$('#t-1')
		.find('thead th')
		.slice(1)
		.each((i, element) => {
			$(element).data(
				'keyType',
				element.className.replace(/^sort-/, '')
			);
		})
		.wrapInner($('<a/>').attr('href', '#'))
		.addClass('sort')
		.on('click', (e) => {
			e.preventDefault();

			const $target = $(e.currentTarget);

			const column = $(e.currentTarget).index();
			const keyType = $(e.currentTarget).data('keyType');
			const sortDirection = $target.hasClass('sorted-asc') ?
				-1 : 1;


			$('#t-1')
				.find('tbody > tr')
				/* .get()
				.sort((a,b) => comparator(
					sortKey(a, column),
					sortKey(b, column)
				))
				.forEach((element) => {
					$(element)
						.parent()
						.append(element);
				}); */
				// because comarator will be called to many times and its not sorting performance we can pre-compute the key fro the comparison and
				// can do the most of the expesive work in an intial loop and store the result with jQuery's .data() method, whichs sets or retrives
				// arbitrary information associated with page elements
				/* .each((i, element) => {
					$(element)
						.data('sortKey', sortKey(element, column)); // sorts all elements and stores in data
				}) */
				// with sortKeys and keyType
				.each((i, element) => {
					$(element).data(
						'sortKey',
						sortKeys[keyType](
							$(element)
								.children('td')
								.eq(column)
						)
					)
				})
				.get()
				.sort((a,b) => comparator(
					$(a).data('sortKey'),
					$(b).data('sortKey'),
					sortDirection
				))
				.forEach((element) => {
					$(element)
						.parent()
						.append(element);
				})

				$target
					.siblings()
					.addBack()
					.removeClass('sorted-asc sorted-desc')
					.end()
					.end()
					.addClass(
						sortDirection == 1 ?
							'sorted-asc' : 'soerted-desc'
					)

		})



	// Using HTML custom data attributes

	// Data objects using JSON syntax
	// <th data-sort='{"key":"title"}'>

	// getting data
	// $('th').first().data('sort').key

	$('#t-2')
		.find('thead th')
		.slice(1)
		.wrapInner($('<a/>').attr('href', '#'))
		.addClass('sort')
		.on('click', (e) => {
			e.preventDefault();

			const $target = $(e.currentTarget);
			const sortKey = $target.data('sort').key;
			const sortDirection = $target.hasClass('sorted-asc') ?
				-1 : 1;

			$('#t-2')
				.find('tbody > tr')
				.get()
				.sort((a,b) => comparator(
					$(a).data('book')[sortKey],
					$(b).data('book')[sortKey],
					sortDirection
				))
				.forEach((element) => {
					$(element)
						.parent()
						.append(element);
				});

			$target
				.siblings()
				.addBack()
				.removeClass('sorted-asc sorted-desc')
				.end()
				.end()
				.addClass(
					sortDirection == 1 ?
						'sorted-asc' : 'sorted-desc'
				);
		});


	// Sorting and building rows with JSON

	// buildAuthors(): This builds a strin list of author names
	// buildRow(): This builds the HTML for a single table row
	// buildRows(): This builds the HTML for the entire table by mappin the rows build by buldRow()

	const buildAuthors = (row, seperator = ', ') => {
	  return row
			.authors
			.map( a => `${a.first_name} ${a.last_name}`)
			.join(seperator);
	}

	// Modifyng the JSON object
	const prepRows = rows =>
		rows
			.map(row => $.extend({}, row, {
				title: row.title.toUpperCase(), // for sort
				titleFormated: row.title, // for display
				authors: buildAuthors(row, ' ').toUpperCase(), // for sort
				authorsFormatted: buildAuthors(row) // for display
			}));

	const buildRow = row =>
		`
			<tr>
				<td><img src="images/${row.img}"></td>
				<td>${row.titleFormated}</td>
				<td>${row.authorsFormatted}</td>
				<td>${row.published}</td>
				<td>$${row.price}</td>
			</tr>
		`;

	const buildRows = rows =>
		rows
			.map(buildRow)
			.join('');

	// get data
	/* Promise.all([$.getJSON('books.json'), $.ready]) // we dont wait for the dom to loead $.redy is a promise that's resolved when the dom is ready.
		.then(([json]) => {
			$('#t-3')
				.find('tbody')
				.html(buildRows(prepRows(json)))
		})
		.catch((err) => {
			console.error(err);
		}) */

	// Rebuilding content on demand
	Promise.all([$.getJSON('books.json'), $.ready])
		.then(([json]) => {
			$('#t-3')
				.find('tbody')
				.html(buildRows(prepRows(json)))

				// Here comparator that is defined at the top

				$('#t-3')
					.find('thead th')
					.slice(1)
					.wrapInner($('<a/>').attr('href', '#'))
					.addClass('sort')
					.on('click', (e) => {
						e.preventDefault();

						const $target = $(e.currentTarget);
						const column = $target.index();

						const sortKey = $target.data('sort').key;
						const sortDirection = $target.hasClass('sorted-asc') ?
							-1 : 1;

						const content = buildRows(
							prepRows(json).sort((a, b) => comparator(
								a[sortKey],
								b[sortKey],
								sortDirection
							))
						)

						$('#t-3')
							.find('tbody')
							.html(content)

						$target
							.siblings()
							.addBack()
							.removeClass('sorted-asc sorted-desc')
							.end()
							.end()
							.addClass(
								sortDirection == 1 ?
									'sorted-asc' : 'sorted-desc'
							);
					})
		})
		.catch((err) => {
			console.error(err);
		})

		// Using shorthand element creation syntax
		// IMPORTANT!!
		$('table')
			.each((i, table) => {
				$('<h3/>', {
					'class': 'table-title',
					id: `table-title-${i}`,
					text: `Table ${i + 1}`,
					data: { index: i},
					click(e){
						e.preventDefault()
						$(table).fadeToggle();
					},
					css: { glowColor: '#00ff00', cursor: 'pointer' } //glowColor is a css hook we defined on page load (at the bottom)
				}).insertBefore(table)
			})

});

(($) => {

	// DOM manipulation hooks
		// Hook type - Method altered - Example usage
		// $.attrHooks - .attr() - Prevents the type attribute of an element fom being changed.
		// $.cssHooks - .css() - Provides speacial handling for opacity in Internet Explorer.
		// $.propHooks - .prop() - Corrects the behavior of the slecte property in Safari.
		// $.valHooks - .val() - Allows radio buttons and checkboxes to report a cinsistent value across browsers.

		// those hooks are hidden from us but we can change them example...
		// Writing a CSS hook
		$.cssHooks.glowColor = {
			set(elem, value){
				elem.style.textShadow = value == 'none' ?
					'' : `0 0 2px ${value}`;
			}
		}

		// Hook shortcomings include
		// - The size of the glow is not customizable
		// - The effect is mutually exclusive with other uses of text-shadow or filter
		// - The get callbacks are unimplemented, so we cannot test for the current value of the property
		// - The property cannot be animated

		// Css Hooks - https://github.com/brandonaaron/jquery-cssHooks

})(jQuery)

// EXERCISES
// 1. Modify the key computation for the first table so that titles and authors are sorted by length rather than alphabetically.
// 2. Use the HTML5 data in the second table to compute the sum of all of the book prices and insert this sum into the heading for that column.
// 3. Change the comparator used for the third table so that titles containing the word jQuery come first when sorted by title.
// 4. Challenge: Implement the get callback for the glowColor CSS hook.