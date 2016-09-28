;(function(window, document, undefined){
	var navBars = document.getElementById("nav-bars"),
		nav = document.getElementById("nav");
	navBars.onclick = function(){
		if(nav.style.display === 'block')nav.style.display = 'none';
		else nav.style.display = 'block';
	}
})(window, document);