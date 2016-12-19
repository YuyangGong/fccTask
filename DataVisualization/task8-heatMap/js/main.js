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

	ajax({
		address: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
		callback: function(data) {
			var len = data.length,
				res = "",
				i;
			for(i = 0; i < len; i++) {
				res += "<div style='top:" + (i * 10) + "px;right:" + (5 * (data[i].Seconds - 2210)) + "px;background-color:" + 
				 		(data[i].Doping ? "red" : "green") + "'>" + data[i].Name +
						"<span><h5></h5>" + (data[i].Name) + ": " + (data[i].Nationality) + "<br/> Year: " + (data[i].Year) + "<br/>Time: " + (data[i].Time) + (data[i].Doping ? ("<h6>" + data[i].Doping +"</h6>") : "") + "</span></div>";
			}
			graph.innerHTML = res;
		}
	});

	function paintNum() {
		var xLine = document.querySelector('.x-line'),
			yLine = document.querySelector('.y-line-inner'),
			xRes = '',
			yRes = '',
			i;
		function getTimeStr(i, gap) {
			var sum = i * gap;
			return ('00' + (sum/60|0)).slice(-2) + ":" + ('00' + (sum % 60)).slice(-2);
		} 
		for(i = 0; i < 8; i++) {
			xRes += "<div class='x-line-num' style='top:" + (49*i - 377) + "px'>"+(i*5)+"</div>"
		}
		for(i = 0; i < 10; i++) {
			yRes += "<div class='y-line-num' style='left:" + (1015 - i*100) + "px'>" + getTimeStr(i, 20) + "</div>";
		}
		xLine.innerHTML = xRes;
		yLine.innerHTML = yRes;
	}

	paintNum();
})(window, document);