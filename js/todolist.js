$(function () {
    //为了在页面第一次加载时就显示数据，先调用一次load
    load();//但是这会导致再手动回车添加数据时，会重复显示两遍的数据，这时需要在load函数中在它渲染页面前清空之前显示的数据
    //用户按下回车，存储用户填写的数据
    $("header input").on("keydown", function (e) {
        if(e.keyCode === 13){//按下回车，保存数据，回车键的ASCII码是13
            if($(this).val() !== ""){
                //先读取本地存储中原来的数据
                var arr = getData();
                // console.log(arr);
                //利用数组的push方法向数组中追加数据后，再重新存入本地存储
                arr.push({title: $(this).val(), done: false});
                saveData(arr);
                load();
                // console.log($(this).val());
                $(this).val("");
            }else{
                alert("请输入内容");
            }
        }
    })

    //读取本地存储数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if(data !== null){
            return JSON.parse(data);//本地存储中的数据是字符串格式，需要转换为对象格式
        }else{
            return [];
        }
    }

    //保存到本地存储
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    //删除本地存储数据
    //因为li及li里面的标签都是动态添加的，所以得通过on来动态绑定事件
    //为什么这么写不行$("ol li a").on("click", function(){}),点一次有用，后面点没有反应？
    // $("ol li a").on("click", function () {
    $("ol, ul").on("click", "a", function () {
        //获取本地存储中的数据
        console.log(123);
        var data = getData();
        //删除数组中的元素，splice("删除元素的开始位置", "删除几个")
        // console.log($(this).attr("index"));
        data.splice($(this).attr("index"), 1);
        // //删除后，将数组再存入本地存储
        saveData(data);
        // //再渲染页面
        load();
    })

    
    //渲染加载数据
    function load() {
        var todoCount = 0;//正在完成的数量
        var undoCount = 0;//已经完成的数量
        $(".con ol, .con ul").empty();
        var data = getData();
        $.each(data, function (index, ele) { 
            //判断done属性值
            if(ele.done){
                undoCount++;
                //为了方便删除，给每个a自定义index属性，获取删除的下标
                //注意不能通过index()的方法获取下标，因为a和其他的a并不是兄弟，因为a与a的父亲都不是同一个
                $(".con ul").prepend("<li> <input type='checkbox' checked = 'checked'> <span>"+ ele.title +
                "</span><a href='javascript:;' index=" + index + "><i class='fa fa-times'></i></a></li>")
            }else{
                todoCount++;
                $(".con ol").prepend("<li> <input type='checkbox'> <span>"+ ele.title +
                "</span><a href='javascript:;' index=" + index + "><i class='fa fa-times'></i></a></li>")
            
            }
        });
        // console.log(todoCount);
        // console.log(undoCount);
        if(todoCount > 0){
            $(".count1").addClass("countStyle").html(todoCount);
        }else{
            $(".count1").removeClass("countStyle").html("");
        }
        if(undoCount > 0){
            $(".count2").addClass("countStyle").html(undoCount);
        }else{
            $(".count2").removeClass("countStyle").html("");
        }
        // todoCount > 0 ? $(".count1").addClass("countStyle").html(todoCount) : $(".count1").romoveClass("countStyle"); 
        // undoCount > 0 ? $(".count2").addClass("countStyle").html(undoCount) : $(".count2").romoveClass("countStyle");
        
    }


    //todolist已完成及正在完成选项
    $("ol, ul").on("click", "input", function () {
        //获取本地存储数据
        var data = getData();
        //通过input的兄弟a的index，就避免了再自定义属性来获得所点击的是哪一个
        var index = $(this).siblings("a").attr("index");
        //修改选中的done属性
        data[index].done = $(this).prop("checked");
        //保存到本地存储
        saveData(data);
        //渲染页面
        load();
    })
})