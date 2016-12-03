;(function(window, document, undefined){
	if(!document.getElementsByClassName) {       //for IE8
		document.getElementsByClassName = function(s) {
			return document.body.querySelectorAll('.header');
		};
	}
	var header = document.getElementsByClassName('header')[0],
		breakElem = document.getElementsByClassName('break')[0].querySelector('.timer'),
		sessionElem = document.getElementsByClassName('session')[0].querySelector('.timer'),
		remain = document.getElementsByClassName('time')[0],
		statusBtn = document.getElementsByClassName('btn')[0];
	
	function getClock(time) {
		return (time/60|0) + ':' + ('0' + time%60).slice(-2);
	}

	var view = {
		break: 5 * 60,
		session: 25 * 60,
		remain: 25 * 60,
		isBreak: false,
		isPause: true,
		timer: null,
		updateView: function() {
			breakElem.innerHTML = this.break/60;
			sessionElem.innerHTML = this.session/60;
			remain.innerHTML = (this.isBreak? 'break' : 'session') + '~' + getClock(this.remain);
		},
		pause: function() {
			clearInterval(this.timer);
			this.isPause = true;
		},
		start: function() {
			this.isPause = false;
			var lastTime = new Date().valueOf(),
				curTime; 
			this.timer = setInterval(function(){
				curTime = new Date().valueOf();
				if(curTime - lastTime > 1000) {
					lastTime += 1000;
					view.remain -= 1;
					view.updateView();
					if(view.remain === 0) {
						view.remain = view.isBreak ? view.session : view.break;
						view.isBreak = !view.isBreak;
					}
				}
			}, 200);
		}
	}

 	var changeTime = {
 		break: {
 			'+': function() {
 				view.break += 60;
 			},
 			'-': function() {
 				if(view.break > 60)view.break -= 60
 			}
 		},
 		session: {
 			'+': function() {
 				view.session += 60
 			},
 			'-': function() {
 				if(view.session > 60)view.session -= 60
 			}
 		},
 		change: function(type, addOrSub) {
 			this[type][addOrSub]();
 			if(view.isBreak && type ==='break' || !view.isBreak && type !=='break')
 				view.remain = view.isBreak ? view.break : view.session;
    		view.updateView();
 		}
 	}

	header.addEventListener('click', function(e) {
    	var e = e || window.event,
    	    target = e.target || e.srcElement,
    	    value = target.innerHTML,
    	    parent = target.parentNode.className;
    	
    	if(target.nodeName.toLowerCase() === 'button') {
    		if(view.isPause) changeTime.change(parent, value);
    	}

    });

    statusBtn.addEventListener('click', function() {
    	if(view.isPause) {
    		view.start();
    		this.className = this.className.replace(/btn1/, 'btn2');
    	}
    	else {
    		view.pause();
    		this.className = this.className.replace(/btn2/, 'btn1');
    	}
    });

})(window, document);