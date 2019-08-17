jQuery( () => {

/* 	$('#switcher-default')
		.addClass('selected');

	$('#switcher')
		.click( (e) => {
			$(e.currentTarget)
				.children('button')
				.toggleClass('hidden');
		})

	$('#switcher button')
		.click( (e) => {
			const bodyClass = e.target.id.split('-')[1];
			$('body')
				.removeClass()
				.addClass(bodyClass)
			$(e.target)
				.addClass('selected')
				.removeClass('selected')

			e.stopPropagation();
		});

	$('#switcher h3')
		.hover(function(){
			$(this).addClass('hover')
		}, function(){
			$(this).removeClass('hover')
		}) */

	// Event delegation
	/*
		const toggleHover = (e) => {
			$(e.target).toggleClass('hover');
		};

		$('#switcher')
			.hover(toggleHover, toggleHover);

		$('#switcher-default')
			.addClass('selected');

		$('#switcher')
			.on('click', 'button', (e) => {

				const bodyClass = e.target.id.split('-')[1];

				$('body')
					.removeClass()
					.addClass(bodyClass);
				$(e.target)
					.addClass('selected')
					.siblings('button')
					.removeClass('selected')

				e.stopPropagation();

			}).on('click', (e) => {

				$(e.currentTarget)
					.children('button')
					.toggleClass('hidden')

			})
	*/

	// Removing event handler
	/*
		$('#switcher')
			.on( 'click.collapse', (e) => {
				if( !$(e.target).is('button')){
					$(e.currentTarget)
						.children('button')
						.toggleClass('hidden')
				}
			});

		$('#switcher-narrow, #switcher-large')
			.click(() => {
				$('#switcher').off('click.collapse')
			})
	*/

	//Rebinding events
	/*
		const toggleSwitcher = (e) => {
			if(!$(e.target).is('button')){
				$(e.currentTarget)
					.children('button')
					.toggleClass('hidden')
			}
		};

		$('#switcher')
			.on('click', toggleSwitcher);

		$('#switcher button')
			.click((e) => {
				$('#switcher').off('click', toggleSwitcher );

				if( e.target.id == 'switcher-default' ){
					$('#switcher').on('click', toggleSwitcher);
				}
			});
	*/
	// Shorethand unbind event after first trigger
	//$('#switcher').one('click', toggleSwitcher);

	//Simulatin user interaction
	//$('#switcher').trigger('click');
	//Or
	//$('#switcher').click();

	//Keyboard events
	/* const triggers = {
		D: 'default',
		N: 'narrow',
		L: 'large'
	}
	$(document).keyup((e) => {
		const key = String.fromCharCode(e.which);
		if( key in triggers ){
			$(`#switcher-${triggers[key]}`).click();
		}
	}); */

	//FINAL CODE

	// Enable hover effect on the style switcher
	const toggleHover = (e) => {
		$(e.target).toggleClass('hover');
	} ;

	$('#switcher').hover(toggleHover, toggleHover);

	// Allow the style switcher to expand and collapse.
	const toggleSwitcher = (e) => {
		if(!$(e.target).is('button')){
			$(e.currentTarget)
			.children('button')
			.toggleClass('hidden')
		}
	};

	$('#switcher')
	.on('click', toggleSwitcher)
	// Simulate a click so we can start in a collapsed state.
	.click();

	// The setBodyClass() function changes the page style.
	// The style switcher state is also updated.
	const setBodyClass = (className) => {
		$('body')
			.removeClass()
			.addClass(className)

		$('#switcher button').removeClass('selected');
		$(`#switcher-${className}`).addClass('selected');
		$('#switcher').off('click', toggleSwitcher);

		if(className == 'default'){
			$('#switcher').on('click', toggleSwitcher);
		}
	};

	// Begin with the switcher-default button "selected"
	$('#switcher-default').addClass('selected');

	// Map key codes to their corresponding buttons to click
	const triggers = {
		D: 'default',
		N: 'narrow',
		L: 'large'
	}

	// Call setBodyClass() when a button is clicked.
	$('#switcher')
		.click((e)=>{
			if($(e.target).is('button')){
				setBodyClass(e.target.id.split('-')[1]);
			}
		});

	// Call setBodyClass() when a key is pressed.
	$(document)
		.keyup((e) => {
			const key = String.fromCharCode(e.which);

			if(key in triggers){
				setBodyClass(triggers[key]);
			}
		})

	// EXERCISES
	// 1. When Charles Dickens is clicked apply selected style to it.
	$('.author:contains(Charles Dickens)')
		.click( (e) => {
			$(e.target).addClass('selected');
			e.stopPropagation();
		})
	// 2. When a chapter title (<h3 class="chapter-title") is duble-clicked, toggle the visibility of the chapter text
	$('.chapter-title')
		.dblclick(function(){
			$(this).nextAll().toggleClass('hidden');
		});
	// 3. When the user presses the right arrow key, cycle to the next body class. They key code for the right arrow key is 39.
	let keypress = 0;
	$(document).on('keyup', (e) => {
		let objectKeys = ['D', 'N', 'L'];
		if( e.which == 39 ){
			setBodyClass(triggers[objectKeys[keypress]])
			keypress == objectKeys.length - 1 ? keypress = 0 : keypress++;
		}
	})
	// 4. Use the console.log() function to log the coordinates of the mouse as it moves accross any paragraph.
	$('p').on('mousemove', (e) => {
		//console.clear();
		//console.log(e.screenX, e.screenY);
	})
	// 5. Use .mousedown() and .mouseup() to track mose events anywhere on the page.
	// If the mouse button is relesed above where it was pressed, add the hidden class to all paragraphs.
	// If it is relsed below where it was pressed, remove the hidden class form all paragraphs.

	var mdPosition = 0;

	$(document)
		.mousedown((e) => mdPosition = e.screenY );
	$(document)
		.mouseup((e) => e.screenY < mdPosition ? $('p').addClass('hidden') : $('p').removeClass('hidden') );
});