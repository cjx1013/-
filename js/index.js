window.addEventListener('load', function () {
    var header = document.querySelector('header');
    var ul = header.children[0];
    var w = header.offsetWidth;
    var index = 0;
    var ol = header.children[1];
    var timer = setInterval(function () {
        index++;
        //移动的距离就是index乘以header的宽度（一张图片的宽度）
        var translateX = -index * w;
        //利用过渡及translateX来实现滚动
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000)
    //当过渡完成之后再去判断，因为如果过渡还没过渡完就判断导致错误，判断过渡事件:transitionend
    ul.addEventListener('transitionend', function () {
        //无缝滚动，当向右移动到最后一张（或者超过了最后一张），迅速让它回到第二张图片的位置（因为第一张图片前面
        //复制了一份最后一张图片，所以第一张图片的位置变成了第二张）
        //为了显示实际上的第一张图片，所以最前面的复制的最后一张图片一开始
        //就是margin-left往左移动了一个图片的距离，然后从实际上第一张图片开始往后移动index++
        //所以index是从实际上第一张图片开始算
        //它的index = 0
        if (index >= 3) {
            index = 0;
            var translateX = -index * w;
            //去掉过渡，以实现迅速滚动到第二张，而不是通过过渡慢慢滚动
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        //同样，向左滚动至第一张图片后，继续往左滚动，那么就让它迅速到倒数第二张图片（最后一张是复制了第一张的图片）
        //因为前面说过，实际上第一张图片的index = 0，所以当向左滚动到复制的最后一张图片，index--，就变为负数了
        if (index < 0) {
            index = 2;
            var translateX = -index * w;
            //去掉过渡，以实现迅速滚动到第二张，而不是通过过渡慢慢滚动
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        //让小圆圈跟随变化
        //注意，要在过渡完成之后再让小圆圈跟随变化
        //之前是通过for循环，干掉所有li的current，再留下自己
        //学习了classList之后，它有一个classList.remove方法，可以很方便的实现干掉所有人的效果
        //就不用for循环了,再用classList.add来留下自己
        ol.querySelector('.current').classList.remove('current');
        // console.log(ol.querySelector('.current'));
        //留下自己
        ol.children[index].classList.add('current');
    })

    //手指滑动轮播图
    //手指移动的距离就是轮播图移动的距离
    var startX = 0;//手指触摸时的初始位置
    var x = 0;//手指移动后的位置
    var moveX = 0;//手指移动的距离
    var flag = false;//用来判断用户手指触摸后是否移动
    ul.addEventListener('touchstart', function (e) {
        //获得手指触摸时的初识位置
        startX = e.targetTouches[0].pageX;
        //同时手指触摸时，轮播图的自动滚动应该关闭,所以清除定时器
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        //获得手指移动后的位置
        x = e.targetTouches[0].pageX;
        moveX = x - startX;
        // console.log(moveX);
        //轮播图移动距离 = 轮播图当前位置 + 手指移动距离
        var translateX = -index * w + moveX;
        // console.log(translateX);
        //手指滑动轮播图时不需要动画，所以取消过渡效果
        ul.style.transition = 'none';
        //轮播图移动后的位置
        ul.style.transform = 'translateX(' + translateX + 'px)';
        e.preventDefault();//手机移动时有可能会造成滚动屏幕，所以这里阻止滚动屏幕的默认行为
        flag = true;//表示移动了手指
    })

    //手动滑动播放上一张或下一张
    ul.addEventListener('touchend', function () {
        //移动了手指再进行下面的效果
        if (flag) {
            //当手指移动距离大于某个数值时，就让它播放上一张或下一张
            //因为有可能是向左滑或者向右滑，而向左滑moveX为负值
            //但是也要滑动，所以给判断条件moveX取绝对值
            if (Math.abs(moveX) > 50) {
                //如果moveX是正值，则轮播图往左滚动
                if (moveX > 0) {
                    index--;
                } else {
                    //如果moveX是负值，则轮播图往右滚动
                    index++;
                }
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                //当手指移动距离小于某个数值时，就让它回弹
                var translateX = -index * w;//也就是不让index变化
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }
        //手指离开后，重新开启定时器
        //小技巧：重新开启定时器之前先清除一遍定时器，防止有多个定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            //移动的距离就是index乘以header的宽度（一张图片的宽度）
            var translateX = -index * w;
            //利用过渡及translateX来实现滚动
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000)
    })

    //返回顶部模块
    //当滑动到某个距离，显示返回顶部模块
    var goBack = document.querySelector('.goBack');
    var displayGoBack = document.querySelector('.displayGoBack');
    window.addEventListener('scroll', function() {
        if(window.pageYOffset >= displayGoBack.offsetTop){
            goBack.style.display = 'block';
        }
    })
    goBack.addEventListener('click', function() {
        window.scroll(0, 0);
    })
})