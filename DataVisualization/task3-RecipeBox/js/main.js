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
        },
        getInnerString: function(node) {
            return '<div class="header">header</div><div class="wrap"><div class="title">'+ node.header 
                  + '</div><div class="list">' + node.list.reduce(function(s, v){
                        return s + '<div class="param">' + v + '</div>';
                  }, '') 
                  + '</div><button class="deleteBtn">Delete</button><button class="editBtn">edit</button></div>';
        }
    }


    var viewModel = {
        list: [],
        isShowEdit : false,
        editIndex: null
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
                childNode.innerHTML = helper.getInnerString(last);
                container.appendChild(childNode);
            }
        },
        showEditBox: function(isAdd, index) {
            if(isAdd) {
                editBox.getElementsByTagName('button')[0].innerHTML = 'add';
                this.resetEditBox();
            }
            else {
                editBox.getElementsByTagName('button')[0].innerHTML = 'edit';
                this.resetEditBox(index);
            }
            editBox.style.display = 'block';
        },
        resetEditBox: function(index) {
            var input = editBox.getElementsByTagName('input'), recipe;
            if(typeof index === 'number') {
                recipe = viewModel.list[index];
                input[0].value = recipe.header;
                input[1].value = recipe.list.join(',');
            }
            else [].forEach.call(input, function(v) {
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
        saveLocalStorage: function() {

        },
        init: function() {
            viewModel.list.push(Recipe('Recipe one', 'test1,test2,test3,test4'), Recipe('Recipe two', 'test1,test2,test3,test4'));
            container.innerHTML = viewModel.list.reduce(function(s, v) {
                return s + '<div class="page">' + helper.getInnerString(v) + '</div>';
            }, '');
        },
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
        if(this.innerHTML !== 'edit') {
            viewModel.list.push(Recipe(input[0].value, input[1].value));
            controller.render(true);
        }
        else {
            var index = viewModel.editIndex,
                inputs = this.parentNode.parentNode.getElementsByTagName('input'),
                recipe = viewModel.list[index];
            recipe.edit(inputs[0].value, inputs[1].value);
            document.querySelectorAll('.page')[index].innerHTML = helper.getInnerString(recipe);
        }
    });
    
    editBtn[1].addEventListener('click', controller.btnCacel);

    container.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            className = target.className,
            list = viewModel.list,
            page, i;
        if(className === 'header') {
            target.nextSibling.style.display = target.nextSibling.style.display === 'none' ? 'block': 'none';
        }
        else if(className === 'deleteBtn') {
            page = target.parentNode.parentNode;
            list.splice([].indexOf.call(document.querySelectorAll('.page'), page), 1);
            page.parentNode.removeChild(page);
        }
        else if(className === 'editBtn') {
            page = target.parentNode.parentNode;
            i = [].indexOf.call(document.querySelectorAll('.page'), page);
            viewModel.editIndex = i;
            controller.showEditBox(false, i);
        }
    })

    controller.init();
})(window, document);