;(function(window, document, undefined) {
	'use strict';
	var container = document.querySelector('.container'),
		setting = document.querySelector('.setting');

	var model = {
		board: [],
		speed: 200,
		timer: null,
		boardSize: [50, 30],
		cellSize: [8, 8],
		cellBorderColor: 'red',
		isRun: false,
		generation: 0,
		dieColor: 'black',
		youngColor: '#0ff',
		olderColor: '#00f',
		dense: 0.2
	};

	var controller = {
		render: function() {
			var containerBox = container,
				cells = containerBox.getElementsByTagName('div'),
				board = model.board,
				dieColor = model.dieColor,
				youngColor = model.youngColor,
				olderColor = model.olderColor,
				outLen = board.length,
				innerLen = (board[0] || []).length,
				i, j, value;
			for(i = 0; i < outLen; i++) {
				for(j = 0; j < innerLen; j++) {
					value = board[i][j];
					cells[i * innerLen + j].style.backgroundColor = (value == 2 ? olderColor : (value == 1 ? youngColor : dieColor));
				}
			}
		},
		generate: function() {
			var board = model.board,
				res = [],
				outLen = board.length,
				innerLen = (board[0] || []).length,
				count, midArr, i, j, positions, top, bottom, left, right,value;
			for(i = 0; i < outLen; i++) {
				var midArr = [];
				for(j = 0; j < innerLen; j++) {
					value = board[i][j];
					top = i > 0 ? i - 1 : outLen - 1;
					bottom = i === outLen - 1 ? 0 : i + 1;
					left = j > 0 ? j - 1 : innerLen - 1;
					right = j === innerLen - 1 ? 0 : j + 1; 
					positions = [[top, left], [top, j], [top, right], [i, left], [i, right], [bottom, left], [bottom, j], [bottom, right]];
					count = positions.filter(function(v) {
						return board[v[0]][v[1]] !== 0;
					}).length;
					if(value === 0) midArr.push(count === 3 ? 1 : 0);
					else {
						if(count < 2 || count > 3) midArr.push(0);
						else midArr.push(2);
					}
				}
				res.push(midArr);
			}
			model.board = res;
			model.generation++;
		},
		reset: function() {
			this.pause();
			var boardSize = model.boardSize,
				cellBorderColor = model.cellBorderColor,
				cellSize = model.cellSize,
				bgColor = model.dieColor,
				cellNum = boardSize[0] * boardSize[1],
				res = '', i;
			model.board = new Array(boardSize[1]).join('-').split('-').map(function(v) {
				return new Array(boardSize[0] + 1).join('0').split('').map(Number);
			});
			for(i = 0; i < cellNum; i++) {
				res += '<div style="width:' + cellSize[0]
					   + 'px;height:' + cellSize[1]
					   + 'px;border-color:' + cellBorderColor
					   + ';background-color:' + bgColor + '"></div>';
			}
			container.style.width = (cellSize[0]+2) * boardSize[0] + 'px';
			container.innerHTML = res;
			model.generation = 0;
			this.render();
		},
		run: function() {
			var mod = model,
				that = this;
			function timer() {
				that.generate();
				that.render();
				mod.timer = setTimeout(timer, mod.speed);
			}
			if(mod.isRun) return;
			mod.isRun = true;
			mod.timer = setTimeout(timer, mod.speed);
		},
		pause: function() {
			if(!model.isRun) return;
			model.isRun = false;
			clearInterval(model.timer);
		},
		random: function() {
			var board = model.board,
				dense = model.dense,
				outLen = board.length,
				innerLen = (board[0] || []).length,
				i, j;
			for(i = 0; i < outLen; i++) {
				for(j = 0; j < innerLen; j++) {
					board[i][j] = Math.random() < dense ? 1 : 0;
				}
			}
			this.render();
		},
		init: function() {
			this.reset();
			this.random();
			this.run();
		}
	}

	var settingController = {
		'run': function() {
			controller.run();
		},
		'pause': function() {
			controller.pause();
		},
		'clear': function() {
			controller.reset();
		},
		'seed': function() {
			controller.random();
		},
		'fast': function() {
			model.speed = 100;
		},
		'medium': function() {
			model.speed = 200;
		},
		'slow': function() {
			model.speed = 400;
		},
		'large': function() {
			model.boardSize = [80, 50];
			controller.reset();
		},
		'middle': function() {
			model.boardSize = [65, 40];
			controller.reset();
		},
		'small': function() {
			model.boardSize = [50, 30];
			controller.reset();
		}
	}

	setting.addEventListener('click', function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement,
			tagName = target.tagName.toLowerCase(),
			className = target.className.toLowerCase();
		if(tagName === 'button') {
			settingController[className]();
		}
	})

	container.addEventListener('click', function(e) {
		e = e || window.event;
		var target = e.target || e.srcElement,
			mod = model,
			width = mod.boardSize[0],
			index;
		if(!target.className) {
			index = [].indexOf.call(container.getElementsByTagName('div'), target);
			model.board[index / width | 0][index % width] = 1;
			controller.render();
		}
	})

	controller.init();
	
})(window, document);