$( () => {

	$('#letter-a a')
		.click((e) => {
			e.preventDefault();

			$('#dictionary').load('a.html');
			alert('Loaded!');
		});

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




});