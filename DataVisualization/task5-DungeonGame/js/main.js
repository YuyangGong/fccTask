;(function(window, document, undefined) {
	'use strict';
	var container = document.querySelector('.container');

	var gameStatus = {
		player: null,
		isLight: false,
		floor: 0,
		maps: []
	};

	var controller = {
		'gameover': function() {
			this.reset();
		},
		'reset': function() {
			
		}
	};

	function Player(name, level, health, power, weapon) {
		this.name = name || "Anonymou";
		this.level = level || 0;
		this.health = health || 100;
		this.power = power || 10; // depend on level and weapon(weapon's attack + level * 10)
		this.weapon = weapon || 0;
		this.exp = 0;
	}
	Player.prototype = {
		'attack': function(target) {
			this.health -= target.power;
			target.power -= this.health;
			if(this.health <= 0) controller.gameover();
		},
		'getHeath': function(target) {
			this.health += target.health;
		},
		'getPower': function(target) {
			this.power += target.power - this.weapon.power;
			this.weapon = target;
		},
		'getExp': function(target) {
			this.exp += target.exp;
			if(this.exp >= 100) this.levelUp();
		},
		'levelUp': function() {
			this.level++;
			this.exp -= 100;
			this.power += 10;
		}
	}

	function Enemy(type, power, health, exp) {
		this.type = type || 'small';
		this.power = power || 10;
		this.health = health || 30;
		this.exp = exp || 20;
	}

	function Wall() {
		this.type = "wall"
	}

	function drag() {
		this.type = "drag";
		this.health = 30;
	}

	function Door() {
		this.type = "door";
	}

	function weapon(type, power) {
		this.type = type;
		this.power = power;
	}

})(window, document);