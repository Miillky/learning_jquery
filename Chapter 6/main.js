$( () => {

	// Improved call is after ajaxStart/Stop()
	/* $('#letter-a a')
		.click((e) => {
			e.preventDefault();

			$('#dictionary').load('a.html');
			alert('Loaded!');
		}); */

	const formatAuthor = entry =>
		entry.author ? `<div class="qoute-author">${entry.author}` : '';

	const formatQuote = entry => entry.quote ?
		`
		<div class="qoute">
			${entry.quote.reduce((result, q) => `
				${result}
				<div class="quote-line">${q}</div>
			`, '')}
			${formatAuthor(entry)}
		</div>
		` : '';

	$('#letter-b a')
		.click((e) => {
			e.preventDefault();

			$.getJSON('b.json', (data) => {

				const html = data.reduce((result, entry) => `
					${result}
					<div class="entry">
						<h3 class="term">${entry.term}</h3>
						<div class="part">${entry.part}</div>
						<div class="definition">
							${entry.definition}
							${formatQuote(entry)}
						</div>
					</div>
				`, '');

				// the ${result} is the value from previous array item
				// the '' is to build a template string

				$('#dictionary')
					.html(html)

			});
		});

	$('#letter-c a')
		.click((e) => {
			e.preventDefault();
			$.getScript('c.js');
		});

		$('#letter-d a')
			.click((e) => {

				const formatAuthor = entry =>
					$(entry).attr('author') ?
						`
						<div class="quote-author">
							${$(entry).attr('author')}
						</div>
						` : '';
					const formatQuote = entry =>
						$(entry).find('quote').length ?
							`
							<div class="quote">
								${$(entry)
									.find('quote')
									.get()
									.reduce((result, q) => `
									<div class="quote-line">
										${$(q).text()}
									</div>
									`, '')}
									${formatAuthor(entry)}
							</div>
							` : '';

						e.preventDefault();

						// jquery can get data from xml like from the DOM
						$.get('d.xml', (data) => {
							const html = $(data)
								.find('entry')
								.get()
								.reduce((result, entry) =>
								`
									${result}
									<div class="entry">
										<h3 class="term">${$(entry).attr('term')}</h3>
										<div class="part">${$(entry).attr('part')}</div>
										<div class="definition">
											${$(entry).find('definition').text()}
											${formatQuote(entry)}
										</div>
									</div>
								`, '');

								$('#dictionary')
									.html(html);
						});

			});

	// SERVER SIDE

	// server side request with node.js

	// SETUP SERVER
	// 1. install npm and node.js
	// 2. crete package.json with express and body-parser dependecies
	// and with start: node server.js for the server.js file
	// 3. terminal -> npm install
	// 4. after installation terminal -> node server.js
	// 5. server will run on localhost:3000
	// 6. try request on http://localhost:3000/e?term=eavesdrop should return data
	// 7. if using live server set header CORS to live server localhost port

	$('#letter-e a')
		.click((e) => {
			e.preventDefault();

			const requestData = {
				term: $(e.target).text().toLowerCase()
			}

			$.get('http://localhost:3000/e', requestData, (data) => {
				$('#dictionary').html(data);
			});

		});

	$('#letter-f form' )
		.submit((e) => {
			e.preventDefault();
			console.log($(e.target).serialize());

			// .serialize() translates matched dom elements into a query string that can be passed alon with an AJAX request
			// same as { term: $('input[name="term"]').val() }
			$.post(
				$(e.target).attr('action'),
				$(e.target).serialize(),
				(data) => { $('#dictionary').html(data); }
			);
		});

	const $loading = $('<div/>')
		.attr('id', 'loading')
		.text('Loading...')
		.insertBefore('#dictionary');

		$(document)
			.ajaxStart(() => {
				$loading.show();
			})
			.ajaxStop(() => {
				$loading.hide();
			})

	// Enchantment to letter a request
	$('#letter-a a').
		click((e) => {
			e.preventDefault();
			$('#dictionary')
				.hide()
				.load('a.html', function() {
					$(this).fadeIn();
				});
		});

	// Error handling

	// $.get() and .load() don't provide error handling but we can use .done(), .always() and .fail() or .ajaxError()

	/* $('#letter-e a')
		.click((e) => {
			e.preventDefault()

			const requestData = {
				term: $(e.target).text()
			};

			$.get('notfound', requestData, (data) => {
				$('#dictionary').html(data);
			}).fail((xhr) => {
				$('#dictionary')
					.html(`An error occurred:
					${xhr.status}
					${xhr.responseText}
				`)
			})

		}) */

	/*
		Response code | Description
		400 -> Bad request
		401 -> Unatorized
		403 -> Forbidden
		404 -> Not found
		500 -> Internal server error

		Complete list of response codes
		http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
	*/

	// Ajax and events
	// Events need to hendled on elements that are not rendered
	// by AJAX, so we bind event to budy to listen for a click
	// event that matches h3.term element even it is added later
	// with AJAX
	$('body')
		.on('click', 'h3.term', (e) => {
			$(e.target)
				.siblings('.definition')
				.slideToggle();
		});

});

// Performing Ajax calls on page load
// AJAX is triggered when javascript is loaded, it won't wait
// for document to load
Promise.all([
	$.get('a.html'),
	$.ready
]).then(([content]) => {
	$('#dictionary')
	.hide()
	.html(content)
	.fadeIn()
});

$( () => {

	// Using fetch()

});