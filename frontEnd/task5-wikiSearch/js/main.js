;(function(window, document, undefined){
  var searchContent = document.getElementById('s-content');
  var btn = document.getElementsByClassName('btn2')[0];
  var contentBox = document.getElementsByClassName('content')[0];

  function createScript(src) {
    var script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
  }
  
  function clearElem(elem) {
    elem.innerHTML = '';
  }

  window.callback = function(res) {
    var resArr = res.query.search,
        len = resArr.length,
        i = 0,
        tempContentBox = document.createDocumentFragment(),
        title, descri, wrap, a;
    for(; i < len; i++) {
      wrap = document.createElement('div');
      title = document.createElement('h3');
      a = document.createElement('a');
      descri = document.createElement('div');
      a.appendChild(document.createTextNode(resArr[i].title));
      a.target = '_blank';
      a.href = 'https://en.wikipedia.org/wiki/' + resArr[i].title;
      title.appendChild(a);
      descri.appendChild(document.createTextNode(resArr[i].snippet.replace(/<.*?>/g, '')));
      wrap.appendChild(title);
      wrap.appendChild(descri);
      tempContentBox.appendChild(wrap);
    }
    contentBox.appendChild(tempContentBox);
  }


  btn.addEventListener('click', function(e) {
    clearElem(contentBox);
    var content = searchContent.value;
    if(content === '') {
      e.preventDefault();
      return false;
    }
    createScript('https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=' + content + '&callback=callback');
    e.preventDefault();
  });


})(window, document);