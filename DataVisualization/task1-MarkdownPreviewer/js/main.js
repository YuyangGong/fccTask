;(function(window, document,undefined){
    var textarea = document.getElementsByTagName('textarea')[0],
        content = document.getElementById('content');

    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });

    function render() {
        var str = marked(textarea.value);
        content.innerHTML = str;
    }

    textarea.addEventListener('keyup', function(e) {
        render();
    })

    textarea.innerHTML = "\n# H1\n## H2\n### H3\nAlternatively, for H1 and H2, an underline-ish style:\nAlt-H1\n======\nAlt-H2\n------\nEmphasis, aka italics, with *asterisks* or _underscores_.\nStrong emphasis, aka bold, with **asterisks** or __underscores__.\nCombined emphasis with **asterisks and _underscores_**.\n\nStrikethrough uses two tildes. ~~Scratch this.~~\n## code:\n```js\nvar str = 'Hello World!';\nconsole.log(str);````";
    render();
})(window, document);