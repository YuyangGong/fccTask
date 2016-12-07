;(function(window, document,undefined){
    var board = document.querySelector('.board'),
        btn = document.querySelectorAll('.btn'),
        startBtn = document.querySelector('.start'),
        resetBtn = document.querySelector('.reset'),
        strictBtn = document.querySelector('.strict'),
        countShow = document.querySelector('.res');

    var status = {
        isStrict: false,
        isStart: false,
        count: 0,
        playerCount: 0,
        isShowOn: false,
        btnSeries: [],
        timer: null
    }

    var operate = {
        rend: function() {
            countShow.innerHTML = status.count;
        },
        start: function() {
            var s = status;
            if(s.isStart) return;
            s.isStart = true;
            this.showBtnSeries();
        },
        reset: function() {
            var s = status;
            clearInterval(s.timer);
            operate.showBtn();
            countShow.innerHTML = '0';
            s.count = 0;
            s.isStart = false;
            s.isShow = false,
            s.btnSeries = [];
            s.playerCount = 0;
        },
        showBtnSeries: function(again) {
            var s = status,
                cur = 0;
            s.isShowOn = true;
            s.playerCount = 0;
            this.rend();
            s.timer = setInterval(function(){
                if(cur === s.btnSeries.length) {
                    clearInterval(s.timer);
                    s.isShowOn = false;
                    if(again) return;
                    var mid = Math.floor(Math.random() * 4);
                    s.btnSeries.push(mid);
                    operate.showBtn(mid);
                    s.count++;
                    return;
                }
                operate.showBtn(s.btnSeries[cur]);
                cur++;
            }, 1000);    
        },
        showBtn: function(n) {
            var len = btn.length, i;
            for(i = 0; i < len; i++) {
                btn[i].style.backgroundColor = 'green';
            }
            if(n !== undefined) {
                btn[n].style.backgroundColor = 'red';
                setTimeout(function() {
                  btn[n].style.backgroundColor = 'green';
                } , 400); 
            }
        },
        win: function() {
            alert('you win!');
            this.reset();
        }
    }

    board.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            s = status,
            operateObj = operate,
            index;
        if(target.nodeName.toLowerCase() === 'button') {
            if(s.isShowOn || !s.isStart) return;
            index = [].indexOf.call(btn, target);
            operateObj.showBtn(index);
            setTimeout(function(){
                if(index !== s.btnSeries[s.playerCount]) {
                    alert('lose! try again!');
                    s.playerCount = 0;
                    if(status.isStrict) operateObj.reset();
                    else operateObj.showBtnSeries(true);
                }
                else {
                    s.playerCount++;
                    if(s.playerCount === s.btnSeries.length) {
                        operateObj.showBtnSeries();
                        if(s.count === 5) operateObj.win();
                    }
                }
            }, 400)
        }
    });
    startBtn.addEventListener('click', function(e) {
        operate.start();
    });
    resetBtn.addEventListener('click', function(e) {
        operate.reset();
    });
    strictBtn.addEventListener('click', function(e) {
        var style = strictBtn.style;
        status.isStrict = !status.isStrict;
        style.backgroundColor = style.backgroundColor === 'red' ? 'green' : 'red';
    });
})(window, document);