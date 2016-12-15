;(function(window, document,undefined) {
	'use strict';
	var container = document.querySelector('.container');

	var model = {
		board: [],
		speed: 200,
		boardSize: [30, 30],
		isRun: false,
		generation: 0,
		dieColor: 'black',
		youngColor: 'green',
		olderColor: 'blue'
	};

	var controller = {
		render: function() {
			var containerBox = container,
				cells = containerBox.getElementsByTagName('div'),
				board = model.board,
				dieColor = model.dieColoe,
				youngColor = model.youngColor,
				olderColor = model.olderColor,
				outLen = board.length,
				innerLen = (board[0] || []).length,
				i, j;
			for(i = 0; i < outLen; i++) {
				for(j = 0; j < innerLen; j++) {
					cells[i * innerLen + j].style.backgroundColor = board[i][j] === 2 ? olderColor : board[i][j] === 1 ? youngColor : dieColor;
				}
			}
		},
		generate: function() {
			var board = model.board,
				res = [],
				outLen = board.length,
				innerLen = (board[0] || []).length,
				count, midArr, i, j;
			for(i = 0; i < outLen; i++) {
				var midArr = [];
				for(j = 0; j < innerLen; j++) {
					count = 0;
					if(board[i][j] === 1) count ++



0 0 0 
0 1 0
0 0 0 
					midArr.push(count < 2 || count > 3 ? 0 : count === 2 && board[i][j] === 0 ? 0 : 1)
				}
				res.push(midArr);
			}
			model.board = res;
		},
		reset: function() {

		},
		clear: function() {

		}
	}
	
})(window, document);