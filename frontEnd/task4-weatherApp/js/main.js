;(function(window, document, undefined) {
	function $(name) {
		return document.querySelector(name);
	}

	function val(elem, text) {
		elem.innerHTML = text;
	}

	function toFahre(c) {
		return c*9/5 + 32;
	}
	
	window.onload = function() {
		function success(position) {
			val($(".content"), position.coords.latitude + " : " + position.coords.longitude);
		}
		function error(errorPosition) {
			val($(".content"), errorPosition);
		}
		navigator.geolocation.getCurrentPosition(success, error);
	}
})(window, document);