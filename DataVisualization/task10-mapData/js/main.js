;~function(window, document, undefined) {
	'use strict';

	var graph = document.querySelector(".graph"),
		svg = document.getElementsByTagName('svg')[0],
		points = document.querySelector('.points');
	function ajax(arg) {
		var require, key, header = arg.header;
		if(window.XMLHttpRequest) {
		  require = new XMLHttpRequest();
		}
		else if(window.ActiveXObject) {
		  require = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if(require) {
			require.onreadystatechange = function() {
				if(require.readyState == 4 && require.status == 200) {
					var obj = JSON.parse(require.responseText);
					if(arg.callback) arg.callback(obj);
				}
			};
			require.open(arg.type || "GET", 
				      arg.address,
				      true);
			if(header) {
				for(key in header) {
					require.setRequestHeader(key, header[key]);
				}
			}
	        require.send();
		}
	}

	function generateStr(obj) {
		if(!obj.geometry) return '';
		var coord = obj.geometry.coordinates,
			left = (coord[0] + 180)/360 * 950 + 'px',
			top = (coord[1] + 90)/180 * 620 + 'px',
			mass = obj.properties.mass || 1,
			large = mass / 5;
		return '<div style="left:' + (left) + '; top:' + (top) + ';background-color:' + (generateColor()) + '">' + generateSpan(obj.properties) + '</div>';
	}

	function generateSpan(obj) {
		return '<span><h4><h5>Name:</h5> ' + (obj.name) + 
			   '</h4><h4><h5>Fall:</h5> ' + (obj.fall) + 
			   '</h4><h4><h5>Mass:</h5> ' + (obj.mass) + 
			   '</h4><h4><h5>Year:</h5> ' + ((obj.year || '').slice(0, 10)) + 
			   '</h4><h4><h5>Recclass:</h5> ' + (obj.recclass) + 
			   '</h4><h4><h5>Nametype:</h5> ' + (obj.nametype) + 
			   '</h4><h4><h5>Reclat:</h5> ' + (obj.reclat) + '</h4></span>';
	}

	function generateColor() {
		function random255() {
			return ('0' + (Math.floor(256*Math.random())).toString(16)).slice(-2);
		}
	 	return '#' + random255() + random255() + random255();
	}

	function generatePoint(respond) {
		var pointArr = respond.features,
			len = pointArr.length,
			resStr = "",
			i;
		pointArr = pointArr.sort(function(a, b) {
			return b.properties.mass - a.properties.mass;
		});
		for(i = 0; i < len; i++) {
			resStr += generateStr(pointArr[i]);
		}
		points.innerHTML = resStr;
	}

	ajax({
		address: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
		callback: function(respond) {
			 generatePoint(respond);
		}	
	});

}(window, document);