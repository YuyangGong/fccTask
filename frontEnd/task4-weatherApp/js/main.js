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
})(window, document);
//9da9913605019c64e36a16359a592153
