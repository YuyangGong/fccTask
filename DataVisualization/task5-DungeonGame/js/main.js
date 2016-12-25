;(function(window, document, undefined) {
	'use strict';
	var container = document.querySelector('.container'),
		statusBox = document.getElementsByTagName('h3')[0];

	var gameStatus = {
		player: null,
		isLight: false,
		floor: 1,
		maps: [],
		curMap: 0
	};

	var controller = {
		'gameover': function() {
			
		},
		'reset': function() {

		},
		'updateStatus': function() {
			var status = gameStatus, 
				player = status.player;
			statusBox.innerHTML = "<h3><span>Health: </span>" + player.health + 
								  "<span>Weapon: </span>" + player.weapon.type + 
								  "<span>Attack: </span>" + player.power + 
								  "<span>Level: </span>" + player.level +
								  "<span>exp: </span>" + player.exp + 
								  "<span>Floor: </span>" + status.floor + "</h3>";
		},
		'init': function() {

		},
		'generateMap': function(bossExist) {

		},
		'renderMap': function() {

		}
	};

	function fillMap(width, height) {
		return new Array(height).join('.').split('.').map(function(v) {
			return new Array(width + 1).join('#').split('');
		});
	}

	function generateMap(bossExist) {
		function generateRoom(map, y, x, dir) {
			if(y < 3 || y > 46 || x < 3 || x > 96) return;
			var room;
			if(dir === 'T') {
				room = [[y, x], [y-1, x], [y-2, x], [y-3, x], [y-1, x+1], [y-2, x+1], [y-3, x+1], [y-1, x-1], [y-2, x-1], [y-3, x-1]];
			}
			else if(dir === 'B') {
				room = [[y, x], [y+1, x], [y+2, x], [y+3, x], [y+1, x+1], [y+2, x+1], [y+3, x+1], [y+1, x-1], [y+2, x-1], [y+3, x-1]];
			}
			else if(dir === 'L') {
				room = [[y, x], [y, x-1], [y, x-2], [y, x-3], [y-1, x-1], [y-1, x-2], [y-1, x-3], [y+1, x-1], [y+1, x-2], [y+1, x-3]];
			}
			else if(dir === 'R') {
				room = [[y, x], [y, x+1], [y, x+2], [y, x+3], [y-1, x+1], [y-1, x+2], [y-1, x+3], [y+1, x+1], [y+1, x+2], [y+1, x+3]];
			}
			if(room.every(function(v) {return map[v[0]][v[1]] === '#'})) {
				room.forEach(function(v) {
					map[v[0]][v[1]] = '0';
				});
				map[y][x] = '_';
				if(Math.rondom() < 0.5) {   //T
					generateRoom(oriMap, y-5, 50, 'T');
				}
				if(Math.rondom() < 0.5) {	//B
					generateRoom(oriMap, y+5, 50, 'B');
				}
				if(Math.rondom() < 0.5) {   //L
					generateRoom(oriMap, 25, 48, 'L');
				}
				if(Math.rondom() < 0.5) {   //R
					generateRoom(oriMap, 25, 52, 'R');
				}
			}			
		}
		var oriMap = fillMap(100, 50),
			i, j;
		for(i = 24; i < 27; i++) {
			for(j = 49; j < 52; j++) {
				oriMap[i][j] = '0';
			}
		}
		if(Math.rondom() < 0.5) {   //T
			generateRoom(oriMap, 23, 50, 'T');
		}
		if(Math.rondom() < 0.5) {	//B
			generateRoom(oriMap, 27, 50, 'B');
		}
		if(Math.rondom() < 0.5) {   //L
			generateRoom(oriMap, 25, 48, 'L');
		}
		if(Math.rondom() < 0.5) {   //R
			generateRoom(oriMap, 25, 52, 'R');
		}
		return oriMap;
	}


	function Player(name, level, health, power, weapon) {
		this.name = name || "Anonymou";
		this.level = level || 0;
		this.health = health || 100;
		this.power = power || 10; // depend on level and weapon(weapon's attack + level * 10)
		this.weapon = weapon;
		this.exp = 0;
		this.curPos = [50, 25];
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