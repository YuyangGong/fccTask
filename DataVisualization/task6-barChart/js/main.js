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

	function getMonth(str) {
		var monthMap = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'August', 'September', 'October', 'November', 'December'],
			month = str.match(/-0?(.*?)-/)[1];
		return monthMap[month - 1];
	}

	ajax({
		address: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
		callback: function(res) {
			var datas = res.data,
				str = "",
				len = datas.length,
				i;
			for(i = 0; i < len; i++) {
				str += "<div style='height:" + (datas[i][1] / 40) + "px;left:" + (20 + i * 4) + "px'><span>$" + (datas[i][1]) + "0 Billion " + (datas[i][0].slice(0, 4)) + "-" + (getMonth(datas[i][0])) + "</span></div>";
			}
			container.innerHTML = "Gross Domestic Product" + str;
		}
	});
})(window, document);