;(function(window, document, undefined){
	var content = document.getElementsByClassName('content')[0],
	    res = document.getElementsByClassName('res')[0],
	 	table = document.getElementsByTagName('table')[0];

    var status = {
    	res: 0,
    	isFinal: false,
    	cur: 0,
    	process: [],
    	updateView: function() {
    		content.innerHTML = this.process.length ? (this.process.join('') + (this.isFinal? '='+this.res : '')) : 0;
    		res.innerHTML = this.isFinal ? this.res : this.cur;
    	},
    	getRes: function() {
    		this.isFinal = true;
    		var calcuArr = this.process,
    			res = +calcuArr[0],
    			len = calcuArr.length,
    			i = 1;
    		for( ; i < len; i+=2 ) {
    			res = calcu[calcuArr[i]](res, +calcuArr[i + 1]);
    		}
    		return +res.toFixed(9);
    	}
    };

    var  calcu = {
    	'+': function(a, b) {return a + b},
    	'-': function(a, b) {return a - b},
    	'*': function(a, b) {return a * b},
    	'/': function(a, b) {return a / b},
    	'%': function(a, b) {return a % b},
    	'√': function(a) {return Math.sqrt(a)}
    }

    var operateProcess = {
    	'AC' : function() {
    		var sObj = status;
    		sObj.isFinal = false;
    		sObj.res = 0;
    		sObj.process = [];
    		sObj.cur = 0;
    	},
    	'CE' : function() {
    		var sObj = status;
    		if(sObj.isFinal) this['AC']();
    		else if(sObj.process.length) {
    			sObj.process.pop();
    			sObj.cur = 0;
    		}
    	},
    	'=' : function() {
    		var sObj = status;
    			arr = sObj.process;
    		if(arr.length || /^\d+$/.test(arr.slice(-1)[0])) {
    			sObj.res = sObj.getRes();
    			sObj.isFinal = true;
    		}
    	},
    	'num' : function(n) {
    		var sObj = status,
    			arr = sObj.process,
    			len = arr.length,
    			last = arr[len - 1];
    		if(sObj.isFinal) {
    			this['AC']();
    			this.num(n);
    		}
    		else if(/0/.test(n) && (/[%\/]/.test(last) || !last )) return;
    		else if(/^-?\d+(\.)?(\d+)?$/.test(last)) {
    			arr[len - 1] += n;
    			sObj.cur = arr[len - 1];
    		}
    		else {
    			arr.push(n.toString());
    			sObj.cur = n;
    		}
    	},
    	'operator' : function(o) {
    		var sObj = status,
				arr = sObj.process,
				last = arr[arr.length - 1];
			if(sObj.isFinal) {
				sObj.isFinal = 0;
				arr.length = 0;
				arr.push(sObj.res, o);
				sObj.res = 0;
				sObj.cur = o;
			}
			else if(/^-?\d+\.?(\d+)?$/.test(last)) {
				arr.push(o);
				sObj.cur = o;
			}
    	},
    	'.' : function() {
    		var sObj = status,
    			arr = sObj.process,
    			last = arr[arr.length - 1];
    		if(/\d/.test(last) && !(/\./.test(last))) {
    			arr[arr.length - 1] += '.';
    			sObj.cur += '.';
    		}
    		else if(!/\d/.test(last)) {
    			arr.push('0.');
    			sObj.cur = '0.';
    		}
    	},
    	'+/-' : function() {
    		var sObj = status;
    			arr = sObj.process;
    		if(/[1-9]/.test(sObj.cur)) {
    			sObj.cur = sObj.cur[0] === '-' ? sObj.cur.slice(1) : '-' + sObj.cur;
    			arr[arr.length - 1] = sObj.cur;
    		}
    	}
    }

    table.addEventListener('click', function(e) {
    	var e = e || window.event,
    	    target = e.target || e.srcElement,
    	    value,
    	    res;
    	if(target.nodeName.toLowerCase() === 'button') {
    		value = target.innerHTML;
    		if(/\d/.test(value)) operateProcess['num'](value);
    		else if(/^[+\-\/\*%]$/.test(value)) operateProcess['operator'](value);
    		else operateProcess[value]();
    		status.updateView();
    	}
    })
})(window, document);