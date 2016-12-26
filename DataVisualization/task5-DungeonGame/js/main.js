;(function(window, document, undefined) {
	'use strict';
	var container = document.querySelector('.container'),
		statusBox = document.getElementsByTagName('h3')[0],
		weaponType = ['arrow', 'spear', 'gun', 'cannon', 'missile'];

	var gameStatus = {
		player: null,
		isLight: false,
		floor: 0,
		maps: [],
		curMap: 0,
		enemy: {}
	};

	var controller = {
		'gameover': function() {
			alert('game over! Please play again!');
			this.reset();
		},
		'win': function() {
			alert('You win! you can play again!');
			this.reset();
		},
		'reset': function() {
			this.init();
		},
		'updateStatus': function() {
			var status = gameStatus, 
				player = status.player;
			statusBox.innerHTML = "<h3><span>Health: </span>" + player.health + 
								  "<span>Weapon: </span>" + weaponType[player.weapon] + 
								  "<span>Attack: </span>" + player.power + 
								  "<span>Level: </span>" + player.level +
								  "<span>exp: </span>" + player.exp + 
								  "<span>Floor: </span>" + status.floor + "<button id='light'>light</button>" + "</h3>";
		},
		'init': function() {
			var status = gameStatus;
			gameStatus.player = new Player();
			gameStatus.isLight = false;
			gameStatus.floor = 0;
			gameStatus.curMap = -1;
			gameStatus.maps = [this.generateMap(), this.generateMap(), this.generateMap(), this.generateMap(), this.generateMap(true)];
			this.goNextMap();
			this.updateStatus();
		},
		'generateMap': function(bossExist) {
			return generateMap();
		},
		'renderMap': function(map) {
			var resStr = "",
				outerLen = map.length,
				innerLen = (map[0]||[]).length,
				isLight = gameStatus.isLight,
				curPos = gameStatus.player.curPos,
				j, i, obj;
			obj = {
				'#': 'wall',
				' ': 'room',
				'_': 'room',
				'1': 'player',
				'2': 'weapon',
				'3': 'drag',
				'4': 'enemy',
				'5': 'door',
				'6': 'boss'
			}
			for(i = 0; i < outerLen; i++) {
				for(j = 0; j < innerLen; j++) {
					resStr += '<div class="' + obj[map[i][j]] + (isLight ? '' : (Math.abs(i - curPos[0])>3 || Math.abs(j - curPos[1])>3? ' dark':'')) + '" "></div>';
				}
			}
			container.innerHTML = resStr; 
		},
		'render': function() {
			var status = gameStatus;
			this.updateStatus();
			this.renderMap(gameStatus.maps[gameStatus.curMap]);
		},
		'goNextMap': function() {
			var statu = gameStatus,
				maps = statu.maps,
				map, i, j, outerLen, innerLen, enemy;
			statu.curMap++;
			statu.floor++;
			map = maps[statu.curMap];
			statu.enemy = {};
			outerLen = map.length;
			innerLen = (map[0]||[]).length;
			for(i = 0; i < outerLen; i++) {
				for(j = 0; j < innerLen; j++) {
					if(map[i][j] == '4') {
						enemy = i+'-'+j;
						statu.enemy[enemy] = new Enemy();
					}
					else if(map[i][j] == '6') {
						enemy = i+'-'+j;
						statu.enemy[enemy] = new Enemy('BOSS', 50, 500);
					}
				}
			}
			this.resetPos();
			this.renderMap(statu.maps[statu.curMap]);
		},
		'resetPos': function() {
			gameStatus.player.curPos = [25, 50];
		},
		'go': function(dir) {
			var map = gameStatus.maps[gameStatus.curMap],
			    player = gameStatus.player,
				originPos = player.curPos,
				targetPos, posTo, targetElem, enemy;
			posTo = {
				't': [originPos[0]-1, originPos[1]],
				'l': [originPos[0], originPos[1]-1],
				'r': [originPos[0], originPos[1]+1],
				'b': [originPos[0]+1, originPos[1]]
			};
			targetPos = posTo[dir];
			if(map[targetPos[0]] && map[targetPos[0]][targetPos[1]]) {
				targetElem = map[targetPos[0]][targetPos[1]];
				if(targetElem == '#') return;
				else if(targetElem == '2') {
					gameStatus.player.weapon++;
					gameStatus.player.power += 10;
				}
				else if(targetElem == '3') {
					gameStatus.player.health += 20;
				}
				else if(targetElem == '4' || targetElem == '6') {					
					enemy = gameStatus.enemy[targetPos[0] + '-' + targetPos[1]];
					player.attack(enemy);
					if(player.health <= 0) this.gameover();
					if(targetElem == '6' && enemy.health < 0) this.win();
					if(enemy.health > 0) return;
					player.exp += enemy.exp;
					if(player.exp >= 100)player.levelUp();
				}
				else if(targetElem == '5') {
					this.goNextMap();
					return;
				}
				map[originPos[0]][originPos[1]] = ' ';
				map[targetPos[0]][targetPos[1]] = '1';
				originPos[0] = targetPos[0];
				originPos[1] = targetPos[1];
			}
		},
		'toggleLight': function() {
			var status = gameStatus;
			status.isLight = !status.isLight;
			this.renderMap(status.maps[status.curMap]);
		}
	};
	// controller.renderMap(generateMap());
	function fillMap(width, height) {
		return new Array(height).join('.').split('.').map(function(v) {
			return new Array(width + 1).join('#').split('');
		});
	}
	// input a bollean to judge weather boss exist.
	// output a map Array.
	function generateMap(bossExist) {
		function generateRoom(map, y, x, dir) {
			if(y < 3 || y > 46 || x < 3 || x > 96) return;
			var room, a, b;
			if(dir === 'T') {
				room = [[y, x], [y-1, x], [y-2, x], [y-3, x], [y-1, x+1], [y-2, x+1], [y-3, x+1], [y-1, x-1], [y-2, x-1], [y-3, x-1]];
				a = y - 2;
				b = x;
			}
			else if(dir === 'B') {
				room = [[y, x], [y+1, x], [y+2, x], [y+3, x], [y+1, x+1], [y+2, x+1], [y+3, x+1], [y+1, x-1], [y+2, x-1], [y+3, x-1]];
				a = y + 2;
				b = x;
			}
			else if(dir === 'L') {
				room = [[y, x], [y, x-1], [y, x-2], [y, x-3], [y-1, x-1], [y-1, x-2], [y-1, x-3], [y+1, x-1], [y+1, x-2], [y+1, x-3]];
				a = y;
				b = x - 2;
			}
			else if(dir === 'R') {
				room = [[y, x], [y, x+1], [y, x+2], [y, x+3], [y-1, x+1], [y-1, x+2], [y-1, x+3], [y+1, x+1], [y+1, x+2], [y+1, x+3]];
				a = y;
				b = x + 2;
			}
			if(room.every(function(v) {return map[v[0]][v[1]] === '#'})) {
				room.forEach(function(v) {
					map[v[0]][v[1]] = ' ';
				});
				map[y][x] = '_';
				if(Math.random() < 0.6 && dir !== 'B') {   //T
					generateRoom(oriMap, a-2, b, 'T');
				}
				if(Math.random() < 0.6 && dir !== 'T') {	//B
					generateRoom(oriMap, a+2, b, 'B');
				}
				if(Math.random() < 0.6 && dir !== 'R') {   //L
					generateRoom(oriMap, a, b-2, 'L');
				}
				if(Math.random() < 0.6 && dir !== 'L') {   //R
					generateRoom(oriMap, a, b+2, 'R');
				}
			}		
		}
		function addMapElem(map, bossExist) {
			var outerLen = map.length,
				innerLen = map[0].length, 
				weapon, first, i, j;
			for(i = 0; i < outerLen; i++) {
				for(j = 0; j < innerLen; j++) {
					if(map[i][j] === ' ') {
						if((!map[i-1]||(map[i-1][j]!='_'))&&map[i][j-1]!='_'&&(!map[i+1]||(map[i+1][j]!='_'))&&map[i][j+1]!='_') {
							if(!first) {
								first = true;
								if(!bossExist)map[i][j] = '5';
								else map[i][j] = '6';
								continue;
							}
							if(Math.random() < 0.1) map[i][j] = '4'; //enemy;
							else if(Math.random() < 0.1) map[i][j] = '3'; //drag;
							else if(Math.random() < 0.05 && !weapon) {  //weapon;
								weapon = true;
								map[i][j] = '2';
							}
						}
					}
				}
			}
			return map;
		}
		var oriMap = fillMap(100, 50),
			i, j;
		for(i = 24; i < 27; i++) {
			for(j = 49; j < 52; j++) {
				oriMap[i][j] = ' ';
			}
		}
		if(Math.random() < 1) {   //T
			generateRoom(oriMap, 23, 50, 'T');
		}
		if(Math.random() < 0.4) {	//B
			generateRoom(oriMap, 27, 50, 'B');
		}
		if(Math.random() < 0.4) {   //L
			generateRoom(oriMap, 25, 48, 'L');
		}
		if(Math.random() < 0.4) {   //R
			generateRoom(oriMap, 25, 52, 'R');
		}
		oriMap[25][50] = '1';
		return addMapElem(oriMap, bossExist);
	}

	function Player(name, level, health, power, weapon) {
		this.name = name || "Anonymou";
		this.level = level || 0;
		this.health = health || 100;
		this.power = power || 10; // depend on level and weapon(weapon's attack + level * 10)
		this.weapon = weapon || 0;
		this.exp = 0;
		this.curPos = [25, 50];
	}
	Player.prototype = {
		'attack': function(target) {
			this.health -= (target.power + (Math.random() * 5 | 0));
			target.health -= (this.power + (Math.random() * 5 | 0));
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
		this.power = power || 5;
		this.health = health || 50;
		this.exp = exp || 10;
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

	document.body.addEventListener('keydown', function(e) {
		e = e || window.event;
		var key = e.keyCode;
		if(key === 38) {    //top
			controller.go('t');
		}
		else if(key === 39) {   // right
			controller.go('r');	
		}
		else if(key === 40) {   // bottom
			controller.go('b');
		}
		else if(key === 37) {   // left
			controller.go('l');
		}
		controller.render();
	});
	
	document.querySelector('.title').addEventListener('click', function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.id = 'light') {
			controller.toggleLight();
		}
	})

	controller.init();

})(window, document);