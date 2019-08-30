/*  $(() => {

	// Loading additional pages of data

	var pageNum = 1;

	$('#more-photos')
		.click((e) => {
			e.preventDefault();

			const $link = $(e.target);
			const url 	= $(e.target).attr('href');

			if(pageNum > 19){
				$link.remove();
				return;
			}

			$link.attr('href', `pages/${++pageNum}.html`);

			$.get(url)
				.then((data) => {
					$('#gallery')
						.append(data)
				})
				.catch(({statusText}) => {
					$('#gallery')
						.append(`<strong>${statusText}</strong>`)
				})
		}) */

		// For users to bookmark Ajax-loaded content we can use the HTML5 history API
		// http://diveintohtml5.info/history.html
		// https://github.com/browserstate/history.js

		// Displaying data on hover

		// First way
		/*
		$('div.photo')
			.hover((e) => {
				$(e.currentTarget)
					.find('.details')
					.fadeTo('fast', 0.7);
			}, (e) => {
				$(e.currentTarget)
					.find('.details')
					.fadeOut('fast')
			}) */

		// Second way
		/* $('div.photo')
			.on('mouseenter mouseleave', (e) => {
				const $details = $(e.currentTarget).find('.details')

				if( e.type == 'mouseenter'){
					$details.fadeTo('fast', 0.7);
				} else {
					$details.fadeOut('fast');
				}

				// or with calss
				// $(e.currentTarget)
				//	.find('.details')
				//	.toggleClass('entered', e.type == 'mouseenter') // second parameter is a boolean to enter class or not

			}); */
			// The new added photos with AJAX wont have the event listener so we need to event delegate (buble)

			// Event delegation

		/* 	$('#gallery')
				.on('mouseover mouseout', (e) => {
					const $target = $(e.target)
						.closest('div.photo');

					const $related = $(e.relatedTarget)
						.closest('div.photo') // if the galery relatet target div.photo exists (if we hovered on the photo)
						// it will return div#container, div.details, and img of the hovered photo

					const $details = $target
						.find('.details');

					if (e.type == 'mouseover' && $target.length) {
						$details.fadeTo('fast', 0.7);
					} else if (e == 'mouseout' && !$related.length) {
						$details.fadeOut('fast');
					}
				}) */

		// Using jQuery's delegation capabilities

		//$('#gallery') // works but its better to use document which is common ancestor of everything on the page
		// but is nog good for performace because every element need to be examined.
		/* $(document)
			.on('mousenter mouseleave', 'div.photo', (e) => {
				const $details = $(e.currentTarget).find('.details');

				if(e.type == 'mouseenter'){
					$details.fadeTo('fast', 0.7)
				} else {
					$details.fadeOut('fast');
				}
			})
}); */

// Delegation earyl
// the document is loaded weven tho the DOM is not so we don't need to wait for the whole DOM to be ready before we want to bind events.
/* (function($){
	$(document)
			.on('mousenter mouseleave', 'div.photo', (e) => {
				const $details = $(e.currentTarget).find('.details');

				if(e.type == 'mouseenter'){
					$details.fadeTo('fast', 0.7)
				} else {
					$details.fadeOut('fast');
				}
			})
})(jQuery); */


// Defining custom events
/* $(() => {


	$('#more-photos')
		.click((e) => {
			e.preventDefault();
			$(e.target).trigger('nextPage');
		});

});

(($) => {

	$(document)
		.on('nextPage', (e) => {
			$.get($(e.target).attr('href'))
				.then((data) => {
					$('#gallery')
						.append(data);
				})
				.catch(({ statusText }) => {
					$('#gallery')
						.append(`<strong>${statusText}</strong>`)
				});
		});

		var pageNum = 1;

		$(document)
			.on('nextPage', () => {
				if(pageNum > 19){
					$('#more-photos').remove();
					return;
				}

				$('#more-photos')
					.attr('href', `pages/${++pageNum}.html`);
			})

})(jQuery); */

// Infinite scrolling

/* (($) => {

	const checkScrollPosition = () => {
		const distance = $(window).scrollTop() +
			$(window).height();

		if($('#container').height() <= distance )
			$(document).trigger('nextPage');
	} */

		/* $(window)
	.scroll(checkScrollPosition)
	.trigger('scroll'); */

	// Trottling event (to limit frequent event triggering)
	/* var timer = 0;

	$(window)
		.scroll( () => {
			if(!timer){
				timer = setTimeout(() => {
					checkScrollPosition();
					timer = 0;
				}, 250);
			}
		}) */

	// or

/* 	var scrolled = false;

	$(window)
		.scroll(() => {
			scrolled = true;
		});

	setInterval(() => {
		if(scrolled){
			checkScrollPosition();
			scrolled = false;
		}
	}, 250);

	var pageNum = 1;

	$(document).on('nextPage', (e, scrollToVisible) => {

		if(pageNum >= 19){
			$('#more-photos').remove();
			return;
		}

		$('#more-photos')
				.attr('href', `pages/${++pageNum}.html`);

		$.get($('#more-photos').attr('href'))
			.then((data) => {
				const $data = $('#gallery')
					.append(data);

				if(scrollToVisible){
					$(window)
						.scrollTop($data.offset().top());
				}

				checkScrollPosition();

			})
			.catch(({statusText}) => {
				$('#gallery')
					.append(`<strong>${statusText}</strong>`)
			});
	});

})(jQuery); */

/* $(() => {

	$('#more-photos')
		.click((e) => {
			e.preventDefault();
			$(e.target).trigger('nextPage', [true]);
		})

}); */

// Extending events
// $ .event.special object
// Has
// add: - This is called every time a handler of this event is bound
// remove: - This is called every time a handler for the vent is unbound
// setup: - This is called when a handler is bound for the event, but only if no other handler for the event are bound to the element
// teardown: - This is the converse of setup, called when the last handler for the event is boun from an elment
// _default: - This becomes the default behavior of the event, called unless the default action is prevented by an event handler
(($) => {

	$.event.special.throttledScroll = {
		setup(data){
			var timer = 0;
			$(this)
				.on('scroll.throttledScroll', () => {
					if(!timer){
						timer = setTimeout(() => {
							$(this).triggerHandler('throttledScroll');
							timer = 0;
						}, 250)
					}
				})
		},
		teardown(){
			$(this).off('scroll.throttledScroll')
		}
	}

	$(document)
		.on('mouseenter mouseleave', 'div.photo', (e) => {
			const $details = $(e.currentTarget).find('.details');

			if (e.type == 'mouseenter') {
				$details.fadeTo('fast', 0.7);
			} else {
				$details.fadeOut('fast');
			}
		});

	var pageNum = 1;

	$(document)
		.on('nextPage', (e, scrollToVisible) => {
			if (pageNum > 19) {
				$('#more-photos').remove();
				return;
			}

		$.get($('#more-photos').attr('href'))
			.then((data) => {

				const $data = $(data)
					.appendTo('#gallery');

				if (scrollToVisible) {
					$(window)
						.scrollTop($data.offset().top);
				}

				checkScrollPosition();
			})
			.catch(({ statusText }) => {
				$('#gallery')
					.append(`<strong>${statusText}</strong>`)
				});
			});

		$(document)
			.on('nextPage', () => {
				if(pageNum < 20){
					$('#more-photos')
						.attr('href', `pages/${++pageNum}.html`);
				}
			});

		const checkScrollPosition = () => {
			const distance = $(window).scrollTop()
				+ $(window).height();

			if($('#container').height() <= distance){
				$(document).trigger('nextPage');
			}
		}

		$(() => {
			$('#more-photos')
				.click((e) => {
					e.preventDefault();
					$(e.target).trigger('nextPage', [true]);
				});

			$(window)
				.on('throttledScroll', checkScrollPosition)
				.trigger('throttledScroll');
		})

})(jQuery);

//EXERCISES

$(() => {

	// 1. When the user clicks on a photo, add or remove the selected class on the photo
	// <div> . Make sure this behavior works even for photos added later using the Next Page link.
	$(document).on( 'click', '.photo', (e) => $(e.target).parent().toggleClass('selected') );

	// 2.Add a new custom event called pageLoaded that fires when a new set of images has been added to the page.
	$(document).on('pageLoaded', () => console.log('image loaded') ); // set trigger in in next page custom event
	// 3. Using the nextPage and pageLoaded handlers, show a Loading message at the bottom of the page only while a new page is being loaded.
	$(document).on( 'nextPage pageLoaded', () => console.log('loading') ) // it works just needs to add the message not the console.log()
	// 4. Bind a mousemove handler to photos that logs the current mouse position (using console.log() ).
	//$(window).on( 'mousemove', (e) => console.log( e.pageX, e.pageY ) );
	// 5. Revise this handler to perform the logging no more than five times a second.
	var wait = false;
	$(document).on('mousemove',function(e){
			if(!wait){
					console.log( e.pageX, e.pageY )
					wait = true;
					setTimeout( () => wait = false, 200); // 200 is 5 times in 1sec
			}
	});

	// Challenge: Create a new special event named tripleclick that fires when the mouse button is clicked on three times within 500 milliseconds. To test the event,
	// bind a tripleclick handler to the <h1> element which hides and reveals the contents of <div id="gallery"> .
	$.event.special.tripleclick = {
		setup(data){
			let clicks = 0
			$(this)
				.on('click.tripleclick', () => {
					clicks++;
					if(clicks == 3)
						$(this).triggerHandler('tripleclick');

					if(clicks)
						setTimeout( () => clicks = 0, 500)
				})
		}
	}
	$('h1').on('tripleclick', () => $('#gallery').toggle());
})