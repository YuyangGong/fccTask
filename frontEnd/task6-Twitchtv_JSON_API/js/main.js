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
		
	}
})(window, document);