$(() => {
	//PLUGINS

	//jQuery Cycle

	// redefining Cycle defaults
	$.fn.cycle.defaults.timeout = 10000;
	$.fn.cycle.defaults.random  = true;

	$('#books').cycle({
		timeout: 2000,
		speed: 200,
		pause: true
	});

	// Custom selectors
	// Extended code down at widgets...
	/* const $books = $('#books').cycle({
		timeout: 2000,
		speed: 200,
		pause: true
	}); */

	/* const $controls = $('<div/>')
		.attr('id', 'books.controls')
		.insertAfter($books); */

	/* $('<button/>')
		.text('Pause')
		.click(() => {
			$books.cycle('pause');
		})
		.appendTo($controls)

	$('<button/>')
		.text('Resume')
		.click(()=> {
			$books.cycle('resume');
		})
		.appendTo($controls); */

	// Resume and pause in one button

/* 	$('<button/>')
		.text('Resume')
		.click(() => {
			$('ul:paused').cycle('resume');
		})
		.appendTo($controls); */

		// Cookies plugin to pause cycle
	/* 	if( $.cookie('cyclePaused') ){
			$books.cycle('pause')
		} */

		// Extended code down...
		/* $('<button/>')
			.text('Pause')
			.click(() => {
				$books.cycle('pause');
				// set cooke on site that expires in 7 days
				$.cookie('cyclePaused', 'y', { path: 'http://127.0.0.1:5500/Chapter%207/index.html', expires: 7 } );
			})
			.appendTo($controls);

		$('<button/>')
			.text('Resume')
			.click( () => {
				$('ul:paused').cycle('resume');
				// null won't remove cookie just set value to null
				$.cookie('cyclePaused', null);
			})
			.appendTo($controls); */


		// jQuery UI
		/* $books.hover( function(e) {
			$(e.target)
				.find('.title')
				.animate({
					backgroundColor: '#eee',
					color: '#000'
				}, 1000);
			}, function(e) {
			$(e.target)
				.find('.title')
				.animate({
					backgroundColor: '#000',
					color: '#fff'
				}, 1000);
			}); */

		// Class animation
		// .addClass(), removeClass() and.toggleClass() are extended by jQuery UI to take a optional second argument fo the animation duration
	/* 	$('h1')
			.click( function(e) {
				$(e.target).toggleClass('highlighted', 'slow');
			}); */

		// Advenced easing
		// https://api.jqueryui.com/easings/
		$('h1')
			.click( function(e){
				$(e.target)
					.toggleClass(
						'highlighted',
						'slow',
						'easeInExpo'
					)
			});

		// Aditional effects
		/* $('<button/>')
			.text('Resume')
			.click( function(e){
				const $paused = $('ul:paused');
				if($paused.length){
					$paused.cycle('resume');
					// null won't remove cookie just set value to null
					$.cookie('cyclePaused', null);
				} else {
					$(e.target)
						.effect('shake', {
							distance: 10
						});
				}
			})
			.appendTo($controls); */

			// Iteraction components
		/* 	$books
			.find('.title')
			.resizable({ handles: 's' }); */

			// Widgets
			//$('button').button();

			/* const $books = $('#books').cycle({
				timeout: 2000,
				speed: 200,
				pause: true,
				before: (li) => {
					// sets current cycle value slider value (to move it)
					$('#slider')
						.slider(
							'value',
							$('#books li').index(li)
						)
				}
			})

			const $controls = $('<div/>')
			.attr('id', 'books.controls')
			.insertAfter($books);

			$('<button/>')
			.text('Pause')
			.button({
					icons: { primary: 'ui-icon-pause' }
				})
			.click(() => {
				$books.cycle('pause');
				// set cooke on site that expires in 7 days
				$.cookie('cyclePaused', 'y', { path: 'http://127.0.0.1:5500/Chapter%207/index.html', expires: 7 } );
			})
			.appendTo($controls);

			$('<button/>')
				.text('Resume')
				.button({
					icons: { primary: 'ui-icon-play' }
				})
				.click( () => {
					const $paused = $('ul:paused');
					if($paused.length){
						$paused.cycle('resume');
						// null won't remove cookie just set value to null
						$.cookie('cyclePaused', null);
					} else {
						$(e.target)
							.effect('shake', {
								distance: 10
							});
					}
				})
				.appendTo($controls);

			$('button').button();

			$('<div/>')
				.attr('id', 'slider')
				.slider({
					min: 0,
					max: $books.find('li').length - 1,
					slide: (e, ui) => {
						//set cycle to current slider value
						$books.cycle(ui.value)
					}
				})
				.appendTo($controls) */

				// jQuery UI ThemeRoller
				// http://jqueryui.com/themeroller/

				// The jQuery Mobile plugin library
				// NOT GOOD

				// EXERCISES
				// 1. Increse the cycle transition duration to half a second, and chage the animation such tat each slides fades out
				// before the next one fades in. Refer to the Cycle documentation to find the appropriate option to enable this.

				const $books = $('#books').cycle({
					timeout: 500,
					speed: 200,
					pause: true,
					before: (li) => {
						// sets current cycle value slider value (to move it)
						$('#slider')
							.slider(
								'value',
								$('#books li').index(li)
							)
					}
				})

				const $controls = $('<div/>')
				.attr('id', 'books.controls')
				.insertAfter($books);

				$('<button/>')
				.text('Pause')
				.button({
						icons: { primary: 'ui-icon-pause' }
					})
				.click(() => {
					$books.cycle('pause');
					// set cooke on site that expires in 7 days
					$.cookie('cyclePaused', 'y', { path: 'http://127.0.0.1:5500/Chapter%207/index.html', expires: 7 } );
				})
				.appendTo($controls);

				$('<button/>')
					.text('Resume')
					.button({
						icons: { primary: 'ui-icon-play' }
					})
					.click( () => {
						const $paused = $('ul:paused');
						if($paused.length){
							$paused.cycle('resume');
							// null won't remove cookie just set value to null
							$.cookie('cyclePaused', null);
						} else {
							$(e.target)
								.effect('shake', {
									distance: 10
								});
						}
					})
					.appendTo($controls);

				$('button').button();

				$('<div/>')
					.attr('id', 'slider')
					.slider({
						min: 0,
						max: $books.find('li').length - 1,
						slide: (e, ui) => {
							//set cycle to current slider value
							$books.cycle(ui.value)
						}
					})
					.appendTo($controls)


				// 2. Set the cyclePaused cookie to persist for 30 days
				$.cookie('cyclePaused', 'y', { path: 'http://127.0.0.1:5500/Chapter%207/index.html', expires: 30 } );
				// 3. Constrain the title box to resize only i ten pixel increments.
				var newHeight = null;
				$books
				.find('.title')
				.resizable({
					handles: 's' ,
					start: function( e, ui ){
							newHeight = ui.element.height() + 10 + "px"

					},
					stop: function( e, ui ){
						console.log( $( ui.element ).css({ height: newHeight }) );
					}
				});

				// 4. Make the slider animate smoothly from one position to the next as the slideshow advances.
				// 5. Instead of letting the slideshow loop forever, cause it to stop after the last slide is shown. Disable the buttons and slider when this happens.
				// 6. Create a new jQuery UI theme that has a light blue widget background and dark blue text and apply the theme to our sample document.
				// 7. Modify the HTML in mobile.html so that the list view is divided up by the first letters of the book titles.
				// See the jQuery Mobile documentation for data-role="list-divider" for details.
});