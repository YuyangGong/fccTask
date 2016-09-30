;(function(window, document, defined){
	var isComplete = true;
	function setAniVal(elem, text) {
		var node = (document.getElementsByClassName(elem) || [])[0],
			isAdd = false,
			style;
		if(!node) return false;
		if(node.timer) clearInterval(node.timer);
		style = node.style;
		node.timer = setInterval(function(){
			if(isAdd) {
				style.opacity = style.opacity * 1 + 0.05;
				if(style.opacity == '1') {
					clearInterval(node.timer);
					isComplete = true;
				}
			}
			else {
				style.opacity -= 0.05;
				if(style.opacity == '0') {
					isAdd = true;
					node.innerHTML = text;
				}
			}
		}, 30);
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
					if(!isComplete) return;
					var str = JSON.parse(ajax.responseText);
					setAniVal('info', str.quote);
					setAniVal('person', '—— ' + str.author);
					isComplete = false;
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