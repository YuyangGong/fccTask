;~function(window, document, undefined) {
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

	var xPos = [114, 246, 378, 510, 642, 774, 906].map(function(v){return v + 120;});
	function getPositionX(n) {
		return xPos[n % 7];
	}

	function getPositionY(n) {
		return 125 + Math.floor(n/7) * 136;
	}

	function generateGraph(respond) {
		var graph = document.querySelector('.graph'),
			nodes = respond.nodes,
			res = "",
			len = nodes.length,
			i;
		for(i = 0; i < len; i++) {
			res += generateDiv(nodes[i].code, nodes[i].country);
		}
		graph.innerHTML = res;
	}

	function generateLines(respond) {
		var svg = document.getElementById('line'),
			links = respond.links,
			res = "",
			len = links.length,
			i;
		for(i = 0; i < len; i++) {
			res += '<line x1="'+(getPositionX(links[i].target))+'" y1="'+(getPositionY(links[i].target))+'" x2="'+(getPositionX(links[i].source))+'" y2="'+(getPositionY(links[i].source))+'"/>';
		}
		svg.innerHTML = res;
	}

	function generateTree(respond) {
		var links = respond.links,
			nodes = respond.nodes,
			len = links.length,
			res = {},
			i;
		nodes.forEach(function(_, i) {
			res[i] = {child: [], value: i};
		});
		for(i = 0; i < len; i++) {
			res[links[i].source].child.push(res[links[i].target]);
		}
		return res; 
	}
	ajax({
		address: "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json",
		callback: function(respond) {
			generateGraph(respond);
			generateLines(respond);
			console.log(generateTree(respond));
		}	
	});

	// var div = graph.querySelectorAll('div');
	// var svg = document.getElementById('line');
	// svg.innerHTML = '<line x1="234" y1="126" x2="200" y2="300"/>';
	// left 104 top 59  add16

}(window, document);