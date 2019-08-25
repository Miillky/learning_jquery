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
	function stripe(){
		$('#news')
			.find('tr.alt')
			.removeClass('alt')
			.end()
			.find('tbody')
			.each((e, element) => {
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
		});

});