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
            coutnShow.innerHTML = status.count;
        },
        start: function() {
            var s = status;
            if(s.isStart) return;
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
            s.timer = setInterval(function(){
                if(cur === s.btnSeries.length) {
                    clearInterval(s.timer);
                    s.isShowOn = false;
                    if(again) return;
                    var mid = Math.floor(Math.random() * 4);
                    s.btnSeries.push(mid);
                    operate.showBtn(mid);
                    return;
                }
                operate.showBtn(cur);
                cur++;
            }, 1000);    
        },
        showBtn: function(n) {
            var len = btn.length, i;
            for(i = 0; i < len; i++) {
                btn[i].style.opacity = '.5';
            }
            if(n !== undefined)btn[n].style.opacity = '1';
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
            index = btn.indexOf(target);
            operateObj.showBtn(index);
            if(index !== s.seriesBtn[s.playerCount]) {
                alert('lose! try again!');
                s.playerCount = 0;
                if(s.isStrict) operateObj.reset();
                else operateObj.showBtnSeries(true);
            }
            else {
                s.playerCount++;
                if(s.playerCount === s.btnSeries.length) operateObj.showBtnSeries();
            }
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
        status.strict = !status.strict;
        style.backgroundColor = style.backgroundColor === 'red' ? 'green' : 'red';
    });
})(window, document);