// Animation
// function arguments in object ({type, target}) get value from the object (object destructuring)
// we get the type and target key from the event object
$(() => {
	$('div.member')
		.on('mouseenter mouseleave', ({type, target}) => {

			const width = height = type == 'mouseenter' ?
				85 : 75;

			const paddingTop = paddingLeft = type == 'mouseenter' ?
				0 : 5;

			$(target)
				.find('img')
				//.not(':animated') // animation are in que to finish so we need to determinate the animation state
				.stop() // halting and running animation (stop current animation before proceeding with the new one)
				.animate({
					width,
					height,
					paddingTop,
					paddingLeft
				})
		})

		// the .stop() method will halt the current animation in its state, to not have unwanted effects on sipes like .slideUp() or .slideDown()
		// we can pass two booleanss true/false with the second to go to end of the animation.

		// Using global effects properties $.fx

		// Disabling all effects
		$('#fx-toggle')
			.show()
			.on('click', () => {
				$.fx.off = !$.fx.off
			});

		// Defining effect durations
		// 1. It checks if $.fx.off is true. If so it sets the duration to 0
		// 2. It checks if the duration passed is a number. If so, it sets the duration to that number of miliseconds.
		// 3. It checks if the duration pass matches on of the property keys of the $.fx.speed object. If so, it sets the duration oto the value of the property
		// 4. If the duration is not set by ony of the above checks, it sets the duration to the value of $.fx.speeds._default
		/* speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		} */
		// those are custom speeds, we can define the custom speed 'crawl'
		// $(someElement).animate({width: '300px'}, 'crawl'); or default $.fx.speeds._default = 250;
		$.fx.speeds._default = 250;
		const showDetails = ({currentTarget}) => {

			$(currentTarget)
				.siblings('.active') // finds siblings with active class
				.removeClass('active') // removes siblings active class
				.children('div') // children div of siblings
				.fadeOut() // fades out children div of siblings
				.end() // siblings with active class selector
				.end() // current target selector
				.addClass('active') // add's an active class to current target
				.find('div')	// finds a div in current target and adds a css to each div inside current target
				.css({
					display: 'block',
					left: '-300px',
					top: 0
				})
				/* .each((i, element) => {
					$(element)
						.animate({
							left: 0,
							top: 25 * i
						});
				}); */

				// Multy-property easing from jQuery-ui
				.each((i, element) => {
					$(element)
						.animate({
							left: 0,
							top: 25 * i
						}, {
							duration: 'slow',
							spacialEasing: {
								top: 'easeInQuart'
							}
						})
				})

		}
		//$('div.member').click(showDetails)

	/*
	.siblings('.active') : This finds the active <div> siblings
	.removeClass('active') : This removes the .active class
	.children('div') : This finds the child <div> elements
	.fadeOut() : This removes them
	.end() : This clears out the .children('div') query
	.end() : This clears out the .siblings('.active') query
	.addClass('active') : This adds the .active class to the event target, the
	container <div>
	.find('div') : This finds all child <div> elements to display
	.css() : This sets relevant display CSS
	.each() : This adds animations to the top and left CSS properties
	*/

	// the default animation of 250 miliseconds applyes to to jQuery pre-packed effects like .fadeOut()

	// Using deffered objects
	// defered ovjects (promises) is an object that encapsulates an operation that take some time to complete
	// $.Deferred()
	// every deferred object makes a promise to provide data to other code
	// The .then() method attaches a handler that is called when the deferred object is resolved successfully
	// The .catch() method attaches a handler that is called when the deferred object is rejected
	// The .always() method attaches a handler that is called when the deferred object completes its task, either by being resolved or by being rejected

	const $movable = $('<div/>')
		.attr('id', 'movable')
		.appendTo('body')

	const bioBaseStyles = {
		display: 'none',
		height: '5px',
		width: '25px'
	}

	const bioEffects = {
		duration: 800,
		easing: 'easeOutQuart',
		specialEasing: {
			opacity: 'linear'
		}
	};

	const showBio = (target) => {
		const $member = $(target).parent();
		const $bio 	  = $member.find('p.bio');
		const startStyles = $.extend(
			{},
			bioBaseStyles,
			$member.offset()
		);
		const endStyles = {
			width: $bio.width(),
			top: $member.offset().top + 5,
			left: $member.width() + $member.offset().left + 5,
			opacity: 'show'
		}

		$movable
			.html($bio.clone())
			.css(startStyles)
			.animate(endStyles, bioEffects)
			.animate(
				{height: $bio.height()},
				{easing: 'easeOutQuart'}
			)
	};

	const newShowDetails = ({currentTarget}) => {
		$(currentTarget)
			.siblings('.active')
			.removeClass('active')
			.children('div')
			.fadeOut()
			.end()
			.end()
			.addClass('active')
			.find('div')
			.css({
				display: 'block',
				left: '-300px',
				top: 0
			})
			.each((i, element) => {
				$(element)
					.animate({
						left: 0,
						top: 25 * i
					}, {
						duration: 'slow',
						specialEasing: {
							top: 'easeInQuart'
						}
					})
			})
			.promise() // when the animation is resolved it will .then start showBio function
			.then(showBio);
	}
	$('div.member').click(newShowDetails)

	// Taking fine-grained control of animations
	$('#mydiv').animate({
			height: '200px',
			width: '400px'
		}, {
		step(now, tween){ //called every 13 miliseconds of animation
			// monitor height and width
			// adjust tween properties
		},
		progress(animation, progress, remainingMs) {}
	})

	// lowest level of jQuery animatio system lie its $.Animation() and $.Tween() function
	// with them we can tweek every posible aspec of an animation
	/* $.Animation.prefilter(function(element, properties, options) {
		if (options.removeAfter) {
			this.done(function () {
				$(element).remove();
			});
		}
	}); */
	// With this code in place, calling $('#my-div').fadeOut({ removeAfter: true }) would automatically remove <div> from the DOM after it has finished fading out.

	// EXERCISES
	// 1. Define a new animation speed constant called zippy and apply this to the biography display effect.
	// 2. Change the easing of the horizontal movement of member details so that they bounce into place.
	// 3. Add a second deferred callback function to the promise that adds a highlight class to the current member's location <div> .
	// 4. Challenge: Add a delay of two seconds before animating the biography. Use the jQuery .delay() method.
	// 5. Challenge: When the active photo is clicked, collapse the bio details. Stop any running animation before doing so.
})