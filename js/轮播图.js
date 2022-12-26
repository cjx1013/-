window.addEventListener('load', function () {
    //鼠标经过轮播图，左右箭头出现，鼠标离开箭头消失
    var arrowLeft = document.querySelector('.arrow-l');
    var arrowRight = document.querySelector('.arrow-r');
    var slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', function () {
        arrowLeft.style.display = 'block';
        arrowRight.style.display = 'block';
        //鼠标经过清除定时器
        clearInterval(timer);
        timer = null;
    })
    slider.addEventListener('mouseleave', function () {
        arrowLeft.style.display = 'none';
        arrowRight.style.display = 'none';
        //鼠标离开开启定时器
        timer = setInterval(function () {
            arrowRight.click();
        }, 2000)
    })

    //根据轮播图片个数，动态生成小圆圈
    var content = document.querySelector('.content');
    var circle = document.querySelector('.circle');
    for (var i = 0; i < content.children.length; i++) {
        var li = document.createElement('li');
        circle.appendChild(li);
        //给每个li自定义属性index，以便下面点击circle的li使图片有滚动效果
        li.setAttribute('index', i);
        //选中哪个li，哪个li为current样式（排他思想）
        li.addEventListener('click', function () {
            //干掉所有人
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            //留下我自己
            this.className = 'current';
            //滚动效果，引入之前写的animate.js
            var index = this.getAttribute('index');
            //为了之后的图片，箭头，与小圆圈同步，需要将index的值给num和flag
            num = flag = index;
            //滚动当然是circle这个ul滚动，而不是li滚动
            //ul滚动的距离就等于负的（因为是向左滚动）当前li的index乘以li容器slider的宽度
            var sliderWidth = slider.offsetWidth;
            animate(content, -index * sliderWidth);
        })
    }
    //给第一个小圆圈li设置选中样式，即设置类名current
    circle.children[0].className = 'current';
    //1、克隆第一个li
    var firstClone = content.children[0].cloneNode(true);//当然是用深克隆，true
    //添加到ul后面
    content.appendChild(firstClone);
    //点击左右箭头使得图片滚动
    //设置一个num，用num * slider宽度来计算滚动距离
    var num = 0;
    var flag = 0;
    var fflag = true;//定义节流阀
    //右侧箭头
    arrowRight.addEventListener('click', function () {
        if (fflag) {
            fflag = false;//关闭节流阀，因为下面要点击箭头了
            num++;
            var sliderWidth = slider.offsetWidth;
            //此时当滚动到最后一张图片的时候，再点击右箭头仍会向右滚动
            //导致没有图片显示，此时需要无缝滚动，无缝滚动要复制一份第一张图片放在最后
            //当点击到最后一张图片时，设置ul的left=0；就迅速回到了头部的第一张图片
            //然后重新设置num=0，就达到了无缝滚动的效果
            //由于在html页面中复制第一张图片来达到无缝滚动的效果，
            //而我们实际要的效果的图片数是不包含在li中复制的第一张图片的
            //所以如果直接在html中复制一个li，那么会因为上面动态生成小圆圈的代码而导致小圆圈数多一个
            //简单来说，就是复制的那张图片是用来无缝滚动的，不能算到小圆圈的个数中
            //那么我们需要在动态生成li的代码后，克隆一份li就行了，如 1 
            if (num == content.children.length - 1) {
                content.style.left = 0;
                num = 0;
            }
            //图片滚动完成后，打开节流阀,利用回调函数的性质
            animate(content, -num * sliderWidth, function () {
                fflag = true;//开启节流阀
            });
            //让小圆圈跟随箭头
            //单独设置一个变量flag，一点右箭头，flag++，再让content.children[flag]的类名变为current
            //同样也要排他思想
            //由于小圆圈比图片少一个，所以当到了最后一张图片时会出错
            //所以当flag到了最后一张图片就让flag重新变为0
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            flag++;
            if (flag == content.children.length - 1) {
                flag = 0;
            }
            circle.children[flag].className = 'current';
        }
    })

    //左侧箭头
    arrowLeft.addEventListener('click', function () {
        if (fflag) {
            fflag = false;
            var sliderWidth = slider.offsetWidth;
            //滚动到了第一张图片，则迅速回到最后一张复制的第一张图片，无缝滚动
            if (num == 0) {
                num = content.children.length - 1;
                content.style.left = slider.offsetWidth * num;
            }
            num--;
            animate(content, -num * sliderWidth, function () {
                fflag = true;
            });

            flag--;
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            }
            if (flag < 0) {
                flag = circle.children.length - 1;
            }
            circle.children[flag].className = 'current';
        }
    })

    //自动播放功能,使用定时器
    //实际上自动播放功能的效果就是跟点击右侧箭头一样的效果
    //所以不用再另外写代码，而是让它自动调用点击右侧箭头的事件
    var timer = setInterval(function () {
        arrowRight.click();
    }, 2000)
})