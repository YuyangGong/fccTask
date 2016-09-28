;(function(window, document, undefined){
	var navBars = document.getElementById("nav-bars"),
		nav = document.getElementById("nav"),
		heightArr = ['topTag', 'portfolioTag' ,'contactTag'].map(function(v){
			return document.getElementById(v).offsetTop;
		}),
		archArr = nav.getElementsByTagName("a"),
		scrollTimer;
	navBars.addEventListener('click', function(){
		var style = nav.style;
		if(style.display === 'block')style.display = 'none';
		else style.display = 'block';
	}, true)
	nav.addEventListener('click', function(e){
		    e = e || window.event;
		    var target = e.target || e.srcElement,
		    	curHeight,
		    	tarHeight,
		    	i;
		    if(target.nodeName.toLowerCase() == "a"){
		  	  if(scrollTimer) window.clearTimeout(scrollTimer);  	
		      i = [].indexOf.call(archArr, target);
		      tarHeight = heightArr[i];
		      scrollTimer = setInterval(function(){
		      	curHeight = document.body.scrollTop;
		      	if(curHeight === tarHeight) clearTimeout(scrollTimer);
		      	if(tarHeight > curHeight) document.body.scrollTop += Math.ceil((tarHeight - curHeight) / 10);
		        else document.body.scrollTop -= Math.ceil((curHeight - tarHeight) / 10);
		      }, 30);
		    }
		    e.preventDefault();
	}, true);
	window.onscroll = function(){
		console.log(1)
		function changeActive(i) {
			[].forEach.call(nav.getElementsByTagName('a'), function(v){
		      	v.className = '';
		    })
		    archArr[i].className = 'active';
		}
		var scrollTop = document.body.scrollTop;
		heightArr.slice().reverse().every(function(v, i) {
			if(scrollTop >= v) changeActive(2 - i);
			else return true;
		});
	}
	window.onresize = function(){
		heightArr = ['topTag', 'portfolioTag' ,'contactTag'].map(function(v){
			return document.getElementById(v).offsetTop;
		});
	}
})(window, document);