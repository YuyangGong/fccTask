;(function(window, document,undefined) {
    var container = document.querySelector('.container'),
        addBtn = document.querySelector('.addBtn'),
        editBox = document.getElementById('editBox'),
        editBtn = editBox.getElementsByTagName('button'),
        input = editBox.getElementsByTagName('input');

    var helper = {
        string2list: function(list) {
            return list.replace(/[<>]/g, function(v) {
                return v === '<' ? '&lt;' : 'gt;';
            }).split(',');
        }
    }


    var viewModel = {
        list: [],
        isShowEdit : false
    };

    var controller = {
        render: function(isAdd) {
            var list = viewModel.list,
                last = list.slice(-1)[0],
                childNode,
                innerStr;
            if(isAdd) {
                childNode = document.createElement('div');
                childNode.className = 'page';
                childNode.innerHTML = '<div class="header">header</div><div class="title">'+ last.header 
                                      + '</div><div class="list">' + last.list.reduce(function(s, v){
                                            return s + '<div class="param">' + v + '</div>';
                                      }, '') 
                                      + '</div><button class="deleteBtn">Delete</button><button class="editBtn">edit</button>';
                container.appendChild(childNode);
            }
        },
        showEditBox: function(isAdd, elem) {
            if(isAdd) {
                editBox.getElementsByTagName('button')[0].innerHTML = 'add';
                this.resetEditBox();
            }
            else {
                editBox.getElementsByTagName('button')[0].innerHTML = 'edit';
            }
            editBox.style.display = 'block';
        },
        resetEditBox: function() {
            [].forEach.call(editBox.getElementsByTagName('input'), function(v) {
                    v.value = '';
            });
        },
        btnCacel: function() {
            editBox.style.display = 'none'; 
            controller.resetEditBox();
            controller.render();
        },
        btnCorrect: function() {
            this.btnCacel();
        },
        init: function() {

        },
        saveLocalStorage: function() {

        }
    }


    function Recipe(header, list) {
        if(!(this instanceof Recipe)) return new Recipe(header, list);
        this.header = header || 'Untitled';
        this.list = helper.string2list(list);

    }
    Recipe.prototype = {
        edit: function(header, list) {
            this.header = header || 'Untitled';
            this.list = helper.string2list(list);
        }
    }

    addBtn.addEventListener('click', function() {
        controller.showEditBox(true);
    });

    editBtn[0].addEventListener('click', function() {
        editBox.style.display = 'none';
        viewModel.list.push(Recipe(input[0].value, input[1].value));
        controller.render(true);
    });
    editBtn[1].addEventListener('click', controller.btnCacel);

    
})(window, document);

