;(function(window, document,undefined){
	var startBtn = document.querySelector('.start-btn'),
		resetBtn = document.querySelector('.reset-btn'),
		table = document.getElementsByTagName('table')[0],
		tableTd = table.getElementsByTagName('td'),
		playerNum = document.getElementById('one'),
		symbol = document.getElementById('O-symbol');

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
			var viewObj = view,
				isTwoPlayer,
				isOSymbol;
			if(viewObj.start) return;
			viewObj.start = true;
			isOnePlayer = playerNum.checked;
			isOSymbol = symbol.checked;
			viewObj.playerNum = isOnePlayer? 'one' : 'two';
			viewObj.symbol = isOSymbol? 'O' : 'X';
			viewObj.curPlayer = 'one';
			console.log(view.symbol)
		},
		go: function(target) {
			var viewObj = view,
				index = [].indexOf.call(tableTd, target);
			if(viewObj.curPlayer === 'one') {
				viewObj.curPlayer = 'two';
				viewObj.chessboard[index] = viewObj.symbol === 'O' ? 'O' : 'X'; 
			}
			else {
				viewObj.curPlayer = 'one';
				viewObj.chessboard[index] = viewObj.symbol === 'O' ? 'X' : 'O'; 
			}
			this.updateView();
		}
	}

	var judge = {
		isEnd: function() {
			var viewObj = view,
				board = viewObj.chessboard,
				str = board.join('').replace(/(.{3})/g, '$1-');
			if(/XXX|X..X..X|X...X...X|X....X....X/.test(str)) {
				return 'WINNER : Player' + (viewObj.symbol === 'X' ? 1 : 2); 
			}
			else if(/OOO|O..O..O|O...O...O|O....O....O/.test(str)) {
				return 'WINNER : Player' + (viewObj.symbol === 'O' ? 1 : 2);
			} 
			else if(str.indexOf('0') === -1) return 'draw!';
		}
	}

	table.addEventListener('click', function(e) {
    	var e = e || window.event,
    	    target = e.target || e.srcElement,
    	    viewObj = view,
    	    winner;
    	if(target.nodeName.toLowerCase() === 'td' && viewObj.start) {
    		if(target.innerHTML === '') {
    			controller.go(target);
    			winner = judge.isEnd();
    			if(winner) {
    				alert(winner);
    				controller.reset();
    			}
    		}
    	}
    });

 	startBtn.addEventListener('click', function(e) {
 		if(!view.start) controller.start();
 	});

 	resetBtn.addEventListener('click', function(e) {
 		if(view.start) controller.reset();
 	});

})(window, document);