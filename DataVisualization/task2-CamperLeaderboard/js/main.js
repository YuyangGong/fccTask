;(function(window, document,undefined){
    var table = document.getElementsByTagName('table')[0],
        btn = document.getElementsByTagName('button')[0],
        completeFlag = [],
        allTimeCamper,
        monthTimeCamper;

    function ajax(arg) {
        var require, key, header = arg.header;
        if(window.XMLHttpRequest) {
          require = new XMLHttpRequest();
        }
        else if(window.ActiveXObject) {
          require = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(require) {
            require.onreadystatechange = function() {
                if(require.readyState == 4 && require.status == 200) {
                    var obj = JSON.parse(require.responseText);
                    if(arg.callback) arg.callback(obj);
                }
            };
            require.open(arg.type || "GET", 
                      arg.address,
                      true);
            if(header) {
                for(key in header) {
                    require.setRequestHeader(key, header[key]);
                }
            }
            require.send();
        }
    }

    function btnAvali() {

    }

    function generateIterm(obj, order) {
        return '<tr><td>' + order + 
               '</td><td><img src=' + obj.img + '></td><td><a target="_blank" href="https://www.freecodecamp.com/' + 
               obj.username + '">' + 
               obj.username + '</a>' +
               '</td><td>' + obj.recent + '</td><td>' + 
               obj.alltime +'</td><tr>';
    }

    function generateTable(arr) {
        var res = '<caption>Top 100 Campers in FFC</caption><tr><th>Order</th><th>image</th><th>Name</th><th>current</th><th>All time</th></tr>',
            i;
        for( i = 0; i < 100; i++ ) {
            res += generateIterm(arr[i], i + 1);
        }
        return res;
    }

    ajax({
        address: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
        callback: function(s) {
            monthTimeCamper = generateTable(s);
            table.innerHTML = monthTimeCamper;
            if(completeFlag[1]) btnAvali();
            completeFlag[0] = true;
        }
    });

    ajax({
        address: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
        callback: function(s) {
            allTimeCamper = generateTable(s);
            if(completeFlag[0]) btnAvali();
            completeFlag[1] = true;
        }
    });

    btn.addEventListener('click', function(e) {
        if(!(completeFlag[0] && completeFlag[1])) return;
        if(btn.innerHTML === 'Current') {
            btn.innerHTML = 'All';
            table.innerHTML = allTimeCamper;
        }
        else {
            btn.innerHTML = 'Current';
            table.innerHTML = monthTimeCamper;
        }
    })

})(window, document);