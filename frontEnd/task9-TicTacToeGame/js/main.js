;(function(window, document,undefined){
	var startBtn = document.querySelector('.start-btn'),
		resetBtn = document.querySelector('.reset-btn'),
		table = document.getElementsByTagName('table')[0],
		tableTd = table.getElementsByTagName('td'),
		step1 = document.getElementById('one'),
		step2 = document.getElementById('O-symbol');

	var view = {
		start: false,
		playerNum: 'one',
		symbol: 'O',
		chessboard: '000000000'.split(''),
		curPlayer: 'one'
	}

	var controller = {
		updateView: function() {
			var len = tableTd.length,
				board = view.chessboard,
				i = 0
			for( ; i < len; i++ ) {
				tableTd[i].innerHTML = board[i] === '0' ? '' : board[i]; 
			}
		},
		reset: function() {
			var viewObj = view;
			viewObj.chessboard = '000000000'.split('');
			viewObj.start = false;
			this.updateView();
		},
		start: function() {
			var viewObj = view;
			if(viewObj) return;
		},
		go: function(target) {
			var viewObj = view;
			if(viewObj.curPlyaer === 'one') {
				viewObj.curPlayer = 'two';

			}
			else
		}
	}

	var judge = {
		isEnd: function() {
			var board = view.chessboard;

		}
	}

})(window, document);