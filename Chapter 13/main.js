$(() => {

	const buildItem = item =>
		`
			<li>
				<h3><a href="${item.html_url}">${item.name}</a></h3>
				<div>★ ${item.stargazers_count}</div>
				<div>${item.description}</div>
			</li>
		`;

	$('#ajax-form')
		.on('submit', (e) => {
			e.preventDefault();

			/* $.ajax({
				url: 'https://api.github.com/search/repositories',
				dataType: 'jsonp', //jsonp adds an ? at the end of the url so it't is in won't treat it as cross origin
				data: { q: $('#title').val()},
				timeout: 10000,
				success(json){
					var output = json.data.items.map(buildItem);
					output = output.length ?
						output.join('') : 'no results found';

					$('#response').html(`<ol>${output}</ol>`)
				},
				// Handling ajax errors
				// Errors callback with trigger when
				// The server returned status code, such as 403 Forbiddend, 404 Not Found, or 500 Internal Server Error
				// The server teturned a redirection status code, such as 301 Moved Permanently.
				// An exeption is 304 Not Minified, which does not trigger an error because the browser can hanlee this codition correctly.
				// The Data returned by the server could not be barsed as specified (for example, it is not valid JSON data when dataType is json).
				// The .abort() method is called on the XMLHttpRequest object.
				error(){
					$('#response').html('Oops. Something went wrong...');
				}
			}); */



			// Ajax prmises
			/* $('#response')
				.addClass('loading')
				.empty();

			$.ajax({
				url: 'https://api.github.com/search/repositories',
				dataType: 'jsonp', //jsonp adds an ? at the end of the url so it't is in won't treat it as cross origin
				data: { q: $('#title').val()},
				timeout: 10000,
			}).then((json) => {

				var output = json.data.items.map(buildItem);
				output = output.length ?
					output.join('') : 'no results found';

				$('#response').html(`<ol>${output}</ol>`)

			}).catch(() => {

				$('#response').html('Oops. Something went wrong...');

			}).always(() => { // after ajax is finished to this (success or error)

				$('#response').removeClass('loading');

			}); */
		});
});

$(() => {

	// Caching responses
	const buildItem = item =>
		`
			<li>
				<h3><a href="${item.html_url}">${item.name}</a></h3>
				<div>★ ${item.stargazers_count}</div>
				<div>${item.description}</div>
			</li>
		`;

	const cache = new Map();

	$('#ajax-form')
		.on('submit', (e) => {
			e.preventDefault();

			// W/O YAML categories
			// const search = $('#title').val();

			// With YAML
			const search = [
				$('#title').val(),
				new Map([
					['JavaScript', 'language:"JavaScript"'],
					['HTML', 'language:"HTML"'],
					['CSS', 'language:"CSS"'],
					['5000+', 'stars:">=5000"'],
					['10000+', 'stars:">=10000"'],
					['20000+', 'stars:">=20000"'],
					['', '']
				]).get($.trim(
					$('#categories')
					.find('li.active')
					.text()
				))
			].join(''); // joins the value of title and value of the clicked category text that is in the map key

			// W/O YAML categories
			/* if(search == ''){
				return;
			} */
			if(search == '' && category == ''){
				return;
			}

			$('#response')
				.addClass('loading')
				.empty();

			// if Map set has our search key then it will get it else it will make ajax request
			cache.set(search, cache.has(search) ?
				cache.get(search) :
				$.ajax({
					url: 'https://api.github.com/search/repositories',
					dataType: 'jsonp',
					data: { q: search },
					timeout: 10000,

				})
				).get(search).then((json) => { //get the search map key with data and then pases it out (chached or new ajax request)

					var output = json.data.items.map(buildItem);

					output = output.length ?
						output.join('') : 'no results found';

					$('#response').html(`<ol>${output}</ol>`);

				}).catch(() => {

					$('#response').html('Oops. Something went wrong...');

				}).always(() => {

					$('#response').removeClass('loading');

				});
		});

	//Throttling Ajax requests
	const searchDelay = 300;
	var searchTimeout;

	$('#title')
		.on('keyup', (e) => {

			clearTimeout(searchTimeout);

			searchTimeout = setTimeout(() => {

				$(e.target.form).triggerHandler('submit');

			}, searchDelay)
		});

	// Data type converters
	// YAML parser http://code.google.com/p/javascript-yaml-parser/

	// Defining a new Ajax data type involves passing three properties to $.ajaxSetup() :
	// accepts , contents , and converters . The accepts property adds headers to be sent to
	// the server, declaring to the server that particular MIME types are understood by our script.
	// The contents property handles the other side of the transaction, providing a regular
	// expression that is matched against the response MIME type to attempt to autodetect the
	//  data type from this metadata. Finally, converters contains the actual functions that parse the returned data

	$.ajaxSetup({
		accepts: {
			yaml: 'application/x-yaml, text/yaml'
		},
		contents: {
			yaml: /yaml/
		},
		converters: {
			'text yaml': (textValue) => YAML.eval(textValue)
		}
	});

	// To load YAML we need a YAML parsing library yaml.js
	Promise.all([
		$.getScript('yaml.js') // YAML script
			.then(() =>
				$.ajax({
					url: 'categories.yml', //our YAML file
					dataType: 'yaml'
				})),
		$.ready // when the document is ready
	]).then(([data]) => {
		const output = Object.keys(data).reduce((result, key) => // gets keys and reduces it by concatinng the main title in strong list and categories in li
			result.concat(
				`<li><strong>${key}</strong></li>`,
				data[key].map( i => `<li> <a href="#">${i}</a></li>`)
			),
			[]
		).join('');

		$('#categories')
			.removeClass('hide')
			.html(`<ul>${output}</ul>`);
	});

	$(document)
		.on('click', '#categories a', (e) => {
			e.preventDefault();

			$(e.target)
				.parent()
				.toggleClass('active')
				.siblings('.active')
				.removeClass('active');

			$('#ajax-form')
				.triggerHandler('submit');
		});

	// Adding Ajax prefilters
	// $.ajaxPrefilters() are callback functions that allow us to manipulate request before they are sent.
	// they are invoked before $.ajax()

	// seting data type as yaml if the corrensponding file extension(.yml) is in the URL of the request
	$.ajaxPrefilter(({url}) => {
		/.yml$/.test(url) ? 'yaml' : null
	});

	$.getScript('yaml.js')
		.then(() => {
			$.ajax({url: 'categories.yml'})
		}); // check network it works

	// Defining alternate tansports
	// transport is an object that handles the actual transmission of Ajax data
	// object htat is returned with .send() and .abort()

	// ajax transport for use <img> elements to fetch external data
	$.ajaxTransport('img', ({ url }) => {
			var $img, img, prop;

			return {
				send(headers, complete){
					const callback = (success) => {
						if(success){
							complete(200, 'OK', {img});
						} else {
							$img.remove()
							complete(404, 'Not Found');
						}
					}

					$img = $('<img>', { src: url} );
					img = $img[0];
					prop = typeof img.naturalWidth === 'undefined' ?
						'width' : 'naturalWidth'; // for browser compatibility

					if(img.complete){
						callback(!!img[prop])
					} else {
						$img.on('load error', ({type}) => {
							callback(type === 'load')
						});
					}
				},

				abort(){
					if($img){
						$img.remove();
					}
				}
			}
	});

	$.ajax({
		url: 'sunset.jpg',
		dataType: 'img'
	}).then((img) => {
		$('<div/>', {
			id: 'picture',
			html: img
		}).appendTo('body');
	}).catch((xhr, textStatus, msg) => {
		$('<div/>', {
			id: 'picture',
			html: `${textStatus}: ${msg}`
		}).appendTo('body')
	})
});

// EXERCISES
// 1. Alter the buildItem() function so that it includes the long description of each jQuery method it displays.
// 2. Here's a challenge for you. Add a form to the page that points to a Flickr public photo search ( http://www.flickr.com/search/ ) and make sure it has <input
// name="q"> and a submit button. Use progressive enhancement to retrieve the photos from Flickr's JSONP feed service at
// http://api.flickr.com/services/feeds/photos_public.gne instead and insert them into the content area of the page. When sending data to this service, use
// tags instead of q and set format to json . Also note that rather than callback , the service expects the JSONP callback name to be jsoncallback.
// Here's another challenge for you. Add error handling for the Flickr request in case it results in parsererror . Test it by setting the JSONP callback name back to callback .