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

	function generateDiv(str) {
		return '<div  class="flag flag-' + str + '"></div>';
	}

	ajax({
		address: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
		callback: function(respond) {
			var graph = document.querySelector('.graph'),
				nodes = respond.nodes,
				links = respond.links,
				res = "",
				len = nodes.length,
				i;
			for(i = 0; i < len; i++) {
				res += generateDiv(nodes[i].code);
			}
			graph.innerHTML = res;
		}
	});

})(window, document);