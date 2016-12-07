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
            if(!s.isStart) return;
            clearInterval(s.timer);
            countShow.innerHTML = '0';
            s.count = 0;
            s.isStart = false;
            s.isShow = false,
            s.btnSeries = [];
        },
        showBtnSeries: function() {
            var s = status,
                cur = 0;
            s.isShowOn = true;
            s.timer = setInterval(function(){
                if(cur === s.btnSeries.length) {
                    var mid = Math.floor(Math.random() * 4);
                    s.btnSeries.push(mid);
                    operate.clickBtn(mid);
                    clearInterval(s.timer);
                    return;
                }
                operate.clickBtn(cur);
                cur++;
            }, 1000);    
        },
        clickBtn: function(n) {
            var len = btn.length, i;
            for(i = 0; i < len; i++) {
                btn[i].style.opacity = '.5';
            }
            btn[n].style.opacity = '1';
        }
    }

    board.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.nodeName.toLowerCase() === 'button') {

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