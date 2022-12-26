$(function () {
    var flag = true;
    //页面一加载就根据它的top显示和隐藏左边导航栏，不然下面的事件是只有窗口滚动时才会触发，
    //要是页面位于中间的位置，再刷新页面，则没有滚动事件，导航栏就不会显示，所以把原先
    //窗口滑动的事件封装成函数，在页面一开始加载时就调用一次
    toggleTool();
    function toggleTool() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    //窗口滑动到一定距离显示左边导航栏
    $(window).scroll(function () {
        toggleTool();
        //当窗口滚动到某个模块区域，对应的导航栏li添加和删除current类
        //循环遍历模块区域

        // $(".floor .w").each(function(index, domEle){
        //     //如果窗口滚动距离大于模块的top对应的导航栏li添加current类，其他li删除current类
        //     if($(document).scrollTop() >= $(domEle).offset().top){
        //         $(".fixedtool li").eq(index).addClass("current").siblings("li").removeClass("current");
        //     }
        // })
        //但是像上面这样写会有一个bug，就是由于点击li会滚动到对应模块区域，
        //所以每次点击li都会触发窗口滚动中的添加移除current类事件
        //所以就会导致经过的每个li都会添加和移除一遍current类，产生样式抖动
        //此时解决办法就是使用节流阀（或者叫互斥锁），当点击li的时候就不让它触发事件中的添加移除current类事件
        if (flag) {
            $(".floor .w").each(function (index, domEle) {
                //如果窗口滚动距离大于模块的top对应的导航栏li添加current类，其他li删除current类
                if ($(document).scrollTop() >= $(domEle).offset().top) {
                    $(".fixedtool li").eq(index).addClass("current").siblings("li").removeClass("current");
                }
            })
        }
        //此时虽然解决了抖动问题，但是会发现点击li后，再滑动窗口时，li的添加移除current类事件失效了
        //因为点击了li，flag=false，添加移除current类事件就不会再执行了，那么什么时候再让它执行呢
        //答案是当我点击li后，窗口滚动到对应模块区域的动画结束后，就可以再次执行了，所以此时animate的参数中的
        //回调函数正好满足这个需要
    });

    //点击导航栏，窗口滚动到导航栏对应的模块区域位置
    $(".fixedtool li").click(function () {
        flag = false;
        //给当前点击的lli添加current类,其他li移除current类
        $(this).addClass("current").siblings("li").removeClass("current");

        // console.log($(this).index());
        //获取各个模块的offset().top
        var currentPosition = $(".floor .w").eq($(this).index()).offset().top;
        //对应index的主体内容显示
        $("body,html").stop().animate({//注意是 $("body,html")进行动画，而不是$(document),因为是元素才能做动画，更不是$(".floor .w")
            scrollTop: currentPosition
        }, function() {//动画结束后，通过回调函数，打开节流阀
            flag = true;
        })

    })
})