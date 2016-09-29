;(function(window, document, defined){
	function setVal(elem, text) {
		var node = (document.getElementsByClassName(elem) || [])[0];
		if(node) node.innerHTML = text;
	}
	var btn = document.getElementById("getQuote");
	btn.onclick = function() {
		var ajax;
		if(window.XMLHttpRequest) {
		  ajax = new XMLHttpRequest();
		}
		else if(window.ActiveXObject) {
		  ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if(ajax) {
			ajax.onreadystatechange = function() {
				if(ajax.readyState == 4 && ajax.status == 200) {
					var str = JSON.parse(ajax.responseText);
					setVal('info', str.quote);
					setVal('person', '—— ' + str.author)
				}
			};
			ajax.open("GET", 
				      "https://andruxnet-random-famous-quotes.p.mashape.com",
				      true);
			ajax.setRequestHeader('X-Mashape-Key', 'KyExfc2nBnmshbHuy4goyGjX3Vqrp1UdKqgjsnVxUxIigQyv5R');
	        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        ajax.setRequestHeader('Accept', 'application/json');
	        ajax.send();
		}
	}
})(window, document);