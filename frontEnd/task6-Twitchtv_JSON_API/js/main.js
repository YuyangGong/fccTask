;(function(window, document, undefined) {
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	
	var twitchApi = {
		getGame: function(res) {
			return res.stream.game;
		},
		getStatus: function(res) {
			return res.stream.channel.status;
		},
		getLogo: function(res) {
			return res.stream.channel.logo;
		},
		getUserName: function(res) {
			return res.stream.channel.display_name;
		},
		getLinkName: function(res) {
			return res._links.self.match(/\/([^/]*)$/)[1];
		}
	}

	function createScript(src) {
	    var script = document.createElement('script');
	    script.src = src;
	    document.body.appendChild(script);
    }

	users.forEach(function(v) {
		createScript('https://wind-bow.hyperdev.space/twitch-api/streams/'+ v + '?callback=?callback');
	});

	window.callback = function(res) {
		console.log(res);
		var logo = document.createElement('img');
		var username = document.createElement('div');
		var status = document.createElement('div');
		var tempFrag = document.createDocumentFragment();
		if(res.stream) {
			logo.src = twitchApi.getLogo(res);
			tempFrag.appendChild(logo);
			username.appendChild(document.createTextNode(twitchApi.getUserName(res)));
			status.appendChild(document.createTextNode(twitchApi.getGame(res)+':'+twitchApi.getStatus(res)));
			tempFrag.appendChild(username);
			tempFrag.appendChild(status);
		} 
		else {
			username.appendChild(document.createTextNode(twitchApi.getLinkName(res)));
			status.appendChild(document.createTextNode('offline'));
			tempFrag.appendChild(username);
			tempFrag.appendChild(status);
		}
		document.body.appendChild(tempFrag);
	}
})(window, document);

;(function(window, document, undefined) {
	
})(window, document);