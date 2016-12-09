;(function(window, document,undefined){
    var textarea = document.getElementsByTagName('textarea')[0],
        content = document.getElementById('content');

    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    textarea.addEventListener('keyup', function(e) {
        var str = marked(textarea.value);
        content.innerHTML = str;
    })
})(window, document);