;(function(window, document, undefined) {
	'use strict';

	var container = document.querySelector(".container");
	
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
				res += "<div style='height:" + (data[i][1] / 40) + "px;left:" + (20 + i * 4) + "px'>" + 
				"<span><h5></h5>" + (data[i].Name) + ": " + (data[i].Nationality) + "<br/> Year: " + (data[i].Year) + "<br/>Time: " + (data[i].Time) + (data[i].Doping ? ("<h6>" + data[i].Doping +"</h6>") : "") + "</span></div>";
			}
			container.innerHTML = "<h2>Doping in Professional Bicycle Racing</h2><h3>35 Fastest times up Alpe d'Huez</h3><h4>Normalized to 13.8km distance</h4>" + res;
		}
	});
})(window, document);