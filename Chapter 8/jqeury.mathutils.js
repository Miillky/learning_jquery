// the $ can be set to any paramter if we set to ljQ we would call all methods with ijQ.mathUtils.sum ...
(($) => {

	$.mathUtils = {
			sum: array =>
				array.reduce(
					(result, item) =>
						parseFloat($.trim(item)) + result, 0
				),
			averge: array =>
				Array.isArray(array) ?
					$.mathUtils.sum(array) / ( array.length) : ''
	}

})(jQuery);