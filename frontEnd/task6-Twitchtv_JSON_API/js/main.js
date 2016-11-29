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
		var contentBox = document.createElement('div');
		if(res.stream) {
			logo.src = twitchApi.getLogo(res);
			contentBox.appendChild(logo);
			username.appendChild(document.createTextNode(twitchApi.getUserName(res)));
			status.appendChild(document.createTextNode(twitchApi.getGame(res)+':'+twitchApi.getStatus(res)));
			contentBox.appendChild(username);
			contentBox.appendChild(status);
			contentBox.className = 'online';
		} 
		else {
			username.appendChild(document.createTextNode(twitchApi.getLinkName(res)));
			status.appendChild(document.createTextNode('offline'));
			contentBox.appendChild(username);
			contentBox.appendChild(status);
			contentBox.className = 'offline';
		}
		document.body.appendChild(contentBox);
	}
})(window, document);

;(function(window, document, undefined) {
	var onElem = document.getElementsByClassName('online'),
	    offElem = document.getElementsByClassName('offline'),
	    btnArr = document.getElementsByTagName('button'),
	    allBtn = btnArr[0],
	    onBtn = btnArr[1],
	    offBtn = btnArr[2];

	function hide(elem) {
		elem.style.display = 'none';
	}
	function show(elem) {
		elem.style.display = '';
	}

	allBtn.addEventListener('click', function(e) {
		[].forEach.call(onElem, function(v) {
			show(v);
		});
		[].forEach.call(offElem, function(v) {
			show(v);
		});
	})

	onBtn.addEventListener('click', function(e) {
		[].forEach.call(onElem, function(v) {
			show(v);
		});
		[].forEach.call(offElem, function(v) {
			hide(v);
		});
	})

	offBtn.addEventListener('click', function(e) {
		[].forEach.call(onElem, function(v) {
			hide(v);
		});
		[].forEach.call(offElem, function(v) {
			show(v);
		});
	})

})(window, document);