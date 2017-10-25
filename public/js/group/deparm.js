(function($){
	$.deparam = $.deparam || function(uri){
		if(uri === 'undefined'){
			uri = window.location.pathname;
		}

		var value1 = uri.split('/');
		var value2 = value1.pop();

		return value2;
	}
})(jQuery);