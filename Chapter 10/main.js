$(() => {

	// Loading additional pages of data

	/* var pageNum = 1;

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
			}) */
});

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

(($) => {

	const checkScrollPosition = () => {
		const distance = $(window).scrollTop() +
			$(window).height();

		if($('#container').height() <= distance )
			$(document).trigger('nextPage');
	}

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

	var scrolled = false;

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

})(jQuery);

$(() => {

	$('#more-photos')
		.click((e) => {
			e.preventDefault();
			$(e.target).trigger('nextPage', [true]);
		})

});