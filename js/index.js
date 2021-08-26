$(function() {
    load();
    // 新增待办事项操作
    $('.doing').on('click', '.addnew', function() {
        var tit = prompt("Enter one thing you are going to do:");
        if (tit !== null && tit !== '') {
            var local = getData();
            local.push({ title: tit, done: false });
            saveData(local);
            load();
        }
    });
    // 编辑某项待办事项操作
    $('.doing').on('click', '.glyphicon-pencil', function() {
        var data = getData();
        var index = $(this).siblings('a').attr("index");
        var tit = prompt("Enter one thing you are going to do:");
        data[index].title = tit;
        saveData(data);
        load();
    });
    // 删除所有未完成的待办事项
    $('.doing').on('click', '.doing-deleteall', function() {
        var data = getData();
        var tmp = [];
        $.each(data, function(i, n) {
            if (n.done) {
                tmp.push(n);
            }
        });
        saveData(tmp);
        load();
    });
    // 删除所有已完成的待办事项
    $('.done').on('click', '.done-deleteall', function() {
        var data = getData();
        var tmp = [];
        $.each(data, function(i, n) {
            if (!n.done) {
                tmp.push(n);
            }
        });
        saveData(tmp);
        load();
    });
    // 完成某项待办事项操作
    $('.doing').on('click', '.glyphicon-check', function() {
        var data = getData();
        var index = $(this).attr("index");
        data[index].done = true;
        saveData(data);
        load();
    });
    // 删除某项完成事项操作
    $('.done').on('click', '.glyphicon-trash', function() {
        var data = getData();
        var index = $(this).siblings('a').attr("index");
        data.splice(index, 1);
        saveData(data);
        load();
    });
    // 撤回重做已完成待办事项操作
    $('.done').on('click', '.glyphicon-share-alt', function() {
        var data = getData();
        var index = $(this).attr("index");
        data[index].done = false;
        saveData(data);
        load();
    });
    // 撤回重做所有已完成待办事项操作
    $('.done').on('click', '.redoall', function() {
        var data = getData();
        $.each(data, function(i, n) {
            if (n.done == true) {
                data[i].done = false;
            }
        })
        saveData(data);
        load();
    });
    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem('todolist');
        if (data !== null) {
            // 本地存储里的数据是字符串格式的，需要转换成对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        var data = getData();
        $('ul').empty();
        var doingCount = 0;
        var doneCount = 0;
        $.each(data, function(i, n) {
            if (!n.done) {
                $('.doing>ul').append('<li> <div><em>' + n.title + '</em></div> <a class="glyphicon glyphicon-pencil" title="edit%$#"></a> <a class="glyphicon glyphicon-check" title="done!!" index=' + i + '></a></li>');
                doingCount++;
            } else {
                $('.done>ul').prepend('<li> <div><del>' + n.title + '</del></div> <a class="glyphicon glyphicon-trash" title="bye~~"></a> <a class="glyphicon glyphicon-share-alt" title="redo.." index=' + i + '></a></li>');
                doneCount++;
            }
        })
        $('.doing>ul').append('<li> <a href="javascript:;" class="addnew">add new...</a> <a href="javascript:;" class="doing-deleteall">delete all!!!</a> </li>');
        $('.done>ul').append('<li> <a href="javascript:;" class="redoall">redo all...</a> <a href="javascript:;" class="done-deleteall">delete all!!!</a></li>');
        $('.doing').find('span').html(doingCount);
        $('.done').find('span').html(doneCount);
    }

})