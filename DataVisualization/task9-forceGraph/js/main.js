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

	function generateDiv(s1, s2) {
		return '<div  class="flag flag-' + s1 + '" title="' + s2 + '"></div>';
	}

	function paintLine(x1, y1, x2, y2) {

	}

	function getPosition(elem) {
		return [elem.offsetLeft, elem.offsetTop];
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
				res += generateDiv(nodes[i].code, nodes[i].country);
			}
			graph.innerHTML = res;
		}
	});

	var div = graph.querySelectorAll('div');
	var svg = document.getElementById('line');
	svg.innerHTML = '<line x1="234" y1="126" x2="200" y2="300"/>';
// left 104 top 59  add16
})(window, document);