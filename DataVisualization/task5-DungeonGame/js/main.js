;(function(window, document, undefined) {
	'use strict';
	var container = document.querySelector('.container');

	var model = {
		player: null,
		floor: 1
	};

	var controller = {

	};

	function Player(name, level, health, attack, weapon) {
		this.name = name || "Anonymou";
		this.level = level || 0;
		this.health = health || 100;
		this.attack = attack || 10;
		this.weapon = weapon || 0;
		this.exp = 0;
	}

})(window, document);