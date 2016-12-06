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
		},
		go: function(target) {
			var viewObj = view,
				index = [].indexOf.call(tableTd, target), computerIndex, winner;
			if(viewObj.curPlayer === 'one') {
				viewObj.curPlayer = 'two';
				viewObj.chessboard[index] = viewObj.symbol === 'O' ? 'O' : 'X';
				if(viewObj.playerNum === 'one' && (computerIndex = computerGO()) !== null) tableTd[computerIndex].click();
			}
			else {
				viewObj.curPlayer = 'one';
				viewObj.chessboard[index] = viewObj.symbol === 'O' ? 'X' : 'O'; 
			}
			this.updateView();
			winner = judge.isEnd();
    			if(winner) {
    				alert(winner);
    				controller.reset();
    		}
		}
	}

	function computerGO() {
		var viewObj = view,
			symbol = viewObj.symbol,
			mySymbol = symbol === 'X' ? 'O' : 'X',
			board = viewObj.chessboard,
			remain,
			mid,
			index,
			count, 
			i;
		var win = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for(i = 0; i < win.length; i++) {
			mid = win[i];
			count = mid.filter(function(vi) {return board[vi] === mySymbol}).length;
			if(count === 2 && mid.some(function(vi) {return board[vi] === '0' })) {
				return mid.filter(function(vi) {return board[vi] === '0'})[0];
			}
		}
		for(i = 0; i < win.length; i++) {
			mid = win[i];
			count = mid.filter(function(vi) {return board[vi] === symbol}).length;
			if(count === 2 && mid.some(function(vi) {return board[vi] === '0' })) {
				return mid.filter(function(vi) {return board[vi] === '0'})[0];
			}
		}
		mid = '402681357';
		for(i = 0; i < mid.length; i++)
			if(board[mid[i]] === '0') return mid[i];
		return null;
	} 
//...
	var judge = {
		isEnd: function() {
			var viewObj = view,
				board = viewObj.chessboard,
				str = board.join('').replace(/(.{3})/g, '$1-'),
				resIndex = [];
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