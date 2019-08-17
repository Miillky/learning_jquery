// Get a single property's value .css('property) -> "value"
// Get muliple propertie's values .css(['property1', 'property-2]) -> {"property1": "value1", "property-2": "value"}
// Set single property and its value .css('property', 'value')
// Set Object of peroperty-value paris .css({property:'value1', 'property-2':'value2'})

$(() => {

	const sizeMap = {
		'switcher-small': n => n / 1.4,
		'switcher-large': n => n * 1.4,
		'switcher-default': () => defaultSize
	};

	const $speech = $('div.speech');
	const defaultSize = parseFloat($speech.css('font-size'))

	/* $('#switcher button')
		.click((e)=>{
			// parseFload strips px from 12px and returns as a number
			const num = parseFloat($speech.css('font-size'))
			$speech.css('font-size', `${sizeMap[e.target.id](num)}px`)
		}); */

	$('p')
		.eq(1)
		.hide();

	// slow -> 600 milliseconds, fast -> 200 miliseconds
	// Show/hide set opacity and hight from top to bottom and from left to right, when elements is set to 0 or 1 it displays none or css set display (for show)

	const $firstPara = $('p')
		.eq(1)
		.hide();

	/* $('a.more')
		.click((e)=>{
			e.preventDefault();
			if($firstPara.is(':hidden')){
				$firstPara.fadeIn('slow');
				$(e.target).text('read less');
			} else {
				$firstPara.fadeOut('slow');
				$(e.target).text('read more');
			}
		}) */
	/* $('a.more')
		.click((e) => {
			e.preventDefault();

			$firstPara.slideToggle('slow');

			$(e.target).text() === 'read more' ?
				$(e.target).text('read less') : $(e.target).text('read more')
		}) */

		// Animate with one argument
		/*
			.animate({
				{ property1: 'value1', proeprty2: 'value2' },
				duration,
				easing,
				() => {
					console.log('THe animation is finished.');
				}
			})
		*/

		// Animate with two arguments
		/*
			.animate({properties}, {options})

			.animate({
				property1: 'value1',
				property2: 'value2'
			}{
				duration: 'value',
				easing: 'value,
				specialEasing: {
					property1: 'easing1',
					property2: 'easing2
				},
				complete: () => {

				},
				query: true,
				step: callback
			});
		*/

		$('a.more')
			.click((e) => {
				e.preventDefault();

				$firstPara.animate({
					height: 'toggle',
					opacity: 'toggle'
				}, 'slow');

				$(e.target)
					.text(
						$(e.target).text() === 'read more' ? 'read less' : 'read more'
					)

			})

		$('#switcher button')
			.click((e) => {
				const num = parseFloat($speech.css('fontSize'));
				$speech.animate({
					fontSize: `${sizeMap[e.target.id](num)}px`
				})
			})

		$('div.label')
			.click((e) => {
				const $switcher = $(e.target).parent();
				const paraWidth = $('div.speech p').outerWidth();
				const switcherWidth = $switcher.outerWidth();

				/* $switcher
					.css('position', 'relative')
					.animate({
						borderWidth: '5px',
						left: paraWidth - switcherWidth,
						height: '+=20px' // relative values must be specified as a string
					}, 'slow') */

				/* $switcher
					.css('position', 'relative')
					.animate({ borderWidth: '5px'}, 'slow')
					.animate({ left: paraWidth - switcherWidth }, 'slow')
					.animate({ height: '+=20px' }, 'slow') */

				/* $switcher
					.css('position', 'relative')
					.fadeTo('fast', 0.5)
					.animate(
						{ left: paraWidth - switcherWidth },
						{ duration: 'slow', queue: false }
					)
					.fadeTo('slow', 1.0)
					.slideUp('slow')
					.queue((next) => {
						$switcher.css('backgroundColor', '#f00');
						next();
					})
					.slideDown('slow') */

				/* $(() => {
						$('p')
							.eq(2)
							.css('border', '1px solid #333')
							.click((e) => {
								$(e.target)
									.next()
									.slideDown('slow', () => {
										$(e.target).slideUp('slow');
									})
							})
						$('p')
							.eq(3)
							.css('backgroundColor', '#ccc')
							.hide()
					}) */

			$switcher
				.css('position', 'relative')
				.fadeTo('fast', 0.5)
				.animate(
					{ left: paraWidth - switcherWidth },
					{ duration: 'slow', queue: false }
				)
				.fadeTo('slow', 1.0)
				.slideUp('slow', () => {
					$switcher.css('backgroundColor', '#f00')
				})
				.slideDown('slow')

		});

		//EXERCISES
		// 1. Alter the stylesheet to hide the contents of the page intialy.
		// When the page is loaded, fade in the content slowly.
		$('body').fadeIn('slow');
		// 2. Give each paragraph a yellow background only wen the mouse i over it.
		$('p')
			.mouseover( (e) => $(e.target).css('backgroundColor', 'yellow' ) )
			.mouseout( (e) => $(e.target).css('backgroundColor', '' ) )
		// 3. Make a click on the title (<h2>) and simutaneosly fade it to 25% opacity
		// and grow its left-hand margint to 20px. Then, when the animation is complete,
		// fade the speech text to 50 percent opacity
		$('h2').click((e) => {
			$(e.target)
				.animate(
					{ opacity: 0.25, 'margin-left': '20px' }
				)
				.siblings('.speech')
				.fadeTo('slow', 0.5)

		})
		// 4. React to press of the arrow keys by smoothly
		// moving the switcher box 20 pixels in the corresponding direction.
		// The keycodes for the arrow keys are: 37(left), 38(up), 39(right), and 40(down).
		$(document).on('keyup', (e) => {

			const keys = {
				'37' : 'left',
				'38' : 'top',
				'39' : 'right',
				'40' : 'bottom'
			}

			let key = e.keyCode;

			$('#switcher').css('position', 'relative');
			if( keys[key] == 'left'){
				$('#switcher')
					.animate({
						'left' : '+=20px',
						'right': '-=20px'
					})
			}
			if( keys[key] == 'right'){
				$('#switcher')
					.animate({
						'right' : '+=20px',
						'left': '-=20px'
					})
			}
			if( keys[key] == 'top'){
				$('#switcher')
					.animate({
						'top' : '-=20px',
						'bottom': '+=20px'
					})
			}
			if( keys[key] == 'bottom'){
				$('#switcher')
						.animate({
							'top' : '+=20px',
							'bottom': '-=20px'
						})
			}

		});
});