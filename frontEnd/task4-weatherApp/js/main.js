;(function(window, document, undefined) {
	//some helper function
	function $(name) {
		return document.querySelector(name);
	}
	function val(elem, text) {
		elem.innerHTML = text;
	}
	function toFahre(c) {
		return c*9/5 + 32;
	}
	function toCels(f) {
		return (f - 32)*5/9;
	}
	function createScript(src) {
		var script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
	}
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


	var curProcess = {
		callback: function(response){   // in fact, this is a callback hell.
			var curIp = response.ip;	// but one day I will come back to fix it! just wait.
			if(!curIp) { 
				this.status = false;
				return;
			}
			this.callback = function(response) { //rewrite the callback for next jsonp
				var countryCode = response.countryCode,
					city = response.city;
				if(!city) {
					this.status = false;
					return;
				}
				ajax({
					type: 'GET',
					address: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countryCode + '&appid=9da9913605019c64e36a16359a592153',
					callback: function(response) {
						console.log(JSON.stringify(response));
					}
				});
			}
			//get adress info
			console.log(window.curProcess.callback);
			createScript("http://ip-api.com/json/" + curIp +"?callback=curProcess.callback");
		},
		status: true
	};

	window.curProcess = curProcess; 
	
	createScript("https://api.ipify.org?format=jsonp&callback=curProcess['callback']");

})(window, document);


//9da9913605019c64e36a16359a592153