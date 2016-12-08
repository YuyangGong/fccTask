;(function(window, document,undefined){
    var board = document.querySelector('.board'),
        btn = document.querySelectorAll('.btn'),
        startBtn = document.querySelector('.start'),
        resetBtn = document.querySelector('.reset'),
        strictBtn = document.querySelector('.strict'),
        countShow = document.querySelector('.res'),
        audio = document.getElementsByTagName('audio'),
        warn = document.querySelector('.warn');

    var status = {
        isStrict: false,
        isStart: false,
        count: 0,
        targetCount : 20,
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
            warn.innerHTML = '';
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
                warn.innerHTML = '';
                if(cur === s.btnSeries.length) {
                    clearInterval(s.timer);
                    s.isShowOn = false;
                    if(again) return;
                    var mid = Math.floor(Math.random() * 4);
                    s.btnSeries.push(mid);
                    operate.showBtn(mid);
                    audio[1].play();
                    s.count++;
                    return;
                }
                operate.showBtn(s.btnSeries[cur]);
                audio[0].play();
                cur++;
            }, 1000);    
        },
        showBtn: function(n) {
            var len = btn.length, i;
            for(i = 0; i < len; i++) {
                btn[i].style.opacity = '1';
            }
            if(n !== undefined) {
                btn[n].style.opacity = '.5';
                setTimeout(function() {
                  btn[n].style.opacity = '1';
                } , 400); 
            }
        },
        win: function() {
            warn.innerHTML = 'Win!';
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
            audio[2].play();
            setTimeout(function(){
                if(index !== s.btnSeries[s.playerCount]) {
                    audio[3].play();
                    warn.innerHTML = 'Lose! Try again!';
                    s.playerCount = 0;
                    if(status.isStrict) operateObj.reset();
                    else operateObj.showBtnSeries(true);
                }
                else {
                    s.playerCount++;
                    if(s.playerCount === s.btnSeries.length) {
                        audio[2].play();
                        operateObj.showBtnSeries();
                        if(s.count === s.targetCount) operateObj.win();
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
        strictBtn.innerHTML = strictBtn.innerHTML === 'ON' ? 'OFF': 'ON';
        style.backgroundColor = style.backgroundColor === 'rgb(224, 36, 49)' ? 'rgb(77, 153, 58)' : 'rgb(224, 36, 49)';
    });
})(window, document);