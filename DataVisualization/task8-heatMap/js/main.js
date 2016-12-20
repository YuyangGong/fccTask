;(function(window, document, undefined) {
	'use strict';

	var container = document.querySelector(".container"),
		graph = document.querySelector(".graph");
	
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

	function getMonth(str) {
		var monthMap = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return monthMap[str - 1];
	}

	var colorSet = new Array(12).join('-').split('-').map(function(_, i) {
			return "rgb(" + (i * 15) + ", " + (i*25) + ", " + (i*20) + ")";
		});

	function getColor(num) {
		var rangeSet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
			i = colorSet.length;
		while(i--) {
			if(num > rangeSet[i]) break;
		}
		return colorSet[i] || colorSet[i + 1];
	}

	ajax({
		address: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json",
		callback: function(respond) {
			var data = respond.monthlyVariance,
				len = data.length,
				baseTemperature = respond.baseTemperature,
				res = "",
				temper,
				i;
			for(i = 0; i < len; i++) {
				temper = (baseTemperature + data[i].variance).toFixed(3);
				res += "<div style='top:" + (i%12*35) + "px;left:" + ((i/12|0)*4) + "px;background-color:" + (getColor(+temper)) + "'>" + 
					   "<span><h5>" + (data[i].year) + " - " + (getMonth(data[i].month)) + "</h5><h6>" + temper + " C°</h6>" + (data[i].variance) + " C°</span></div>";
			}
			graph.innerHTML = res;
		}
	});

	function paintColorBlock() {
		var colorBlock = document.querySelector('.color-block'),
			res = "",
			i;
		console.log(colorBlock)
		for(i = 0; i < 12; i++) {
			res += "<div style='left:" + (i*30) + "px;background-color:" + (colorSet[i]) + "'><span>" + i + "</span></div>";
		}
		colorBlock.innerHTML = res;
	}

	function paintNum() {
		var xLine = document.querySelector('.x-line'),
			yLine = document.querySelector('.y-line'),
			xRes = '',
			yRes = '',
			i;
		for(i = 0; i < 26; i++) {
			xRes += "<div style='right:" + (7 + i * 40) + "px'>" + (2010 - i*10) + "</div>";
		}
		for(i = 0; i < 12; i++) {
			yRes += "<div style='top:" + (10 + i*35) + "px'>" + getMonth(i + 1) + "</div>";
		}
		xLine.innerHTML = xRes;
		yLine.innerHTML = yRes;
	}

	paintColorBlock();
	paintNum();
})(window, document);