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
		
	}
})(window, document);