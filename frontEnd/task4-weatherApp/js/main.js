;(function(window, document, undefined) {
	//some helper function
	function $(name) {
		return document.querySelector(name);
	}
	function val(elem, text) {
		elem.innerHTML = text;
	}
	function toFahre(c) {
		return Math.round(c*9/5 + 32);
	}
	function toCels(f) {
		return Math.round((f - 32)*5/9);
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

	//add eventListener to button for switch Fahrenheit and Celsius
	$('.btn').addEventListener('click', function() {
		var style = this.style,
			color = style.backgroundColor,
			weatherNum = $('.num');
		if(color == "rgb(95, 174, 96)") {
			style.backgroundColor = "#d14242";
			val(this, "to Fahrenheit");
			val(weatherNum, toCels(+weatherNum.innerHTML.replace(/[^\d]/g, '')) + '°F');
		}
		else {
			style.backgroundColor = "#5fae60";
			val(this, "to Celsius");
			val(weatherNum, toFahre(+weatherNum.innerHTML.replace(/[^\d]/g, '')) + '°C');
		}
	});

	//use some API to get current weather
	var curProcess = {
		callback: function(response){   // in fact, this is a callback hell.
			var curIp = response.ip;	// but one day I will come back to fix it! just wait.
			if(curIp) { 
				this.callback = function(response) { //rewrite the callback for next jsonp
					var countryCode = response.countryCode,
						city = response.city;
					if(city) {
						ajax({
							type: 'GET',
							address: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + countryCode + '&appid=9da9913605019c64e36a16359a592153',
							callback: function(response) {
								var weather = response.weather[0],
									curTime = new Date,
									img;
								if(weather) {
									this.status = true;
									val($('.num'), Math.round(response.main.temp - 273.15) + '°C');
									val($('.weather-data'), weather.main);
									val($('.weather-pos'), curTime.toString().match(/([a-z]+) \d+ \d+/i)[0] + ', ' + city);
									$('.btn').style.display = '';
									img = new Image();
									img.src = 'http://openweathermap.org/img/w/' + weather.icon + '.png';
									$('.icon').appendChild(img);
								}
							}
						});
					}
				}
				//get adress info
				createScript("http://ip-api.com/json/" + curIp +"?callback=curProcess.callback");				
			}
		},
		status: false
	};

	window.curProcess = curProcess; 
	
	createScript("https://api.ipify.org?format=jsonp&callback=curProcess['callback']");

})(window, document);
