window.addEventListener('load', function() {
    var small = document.querySelector('.small');
    var scale = document.querySelector('.scale');
    var child = scale.children;
    var big = child[0];
    var father = document.querySelector('.father');
    //鼠标经过手机，显示放大镜方块和大手机方块
    father.addEventListener('mouseover', function() {
        small.style.display = 'block';
        scale.style.display = 'block';
    })
    //鼠标离开，隐藏放大镜方块和大手机方块
    father.addEventListener('mouseout', function() {
        small.style.display = 'none';
        scale.style.display = 'none';
    })
    //让放大镜方块跟随鼠标移动
    father.addEventListener('mousemove', function(e) {
        //得到鼠标距离father盒子的x轴和y轴坐标,这里与前面的案例不同的是这个放大镜方块的父亲
        //father盒子div设置了定位，所以它根据在父亲盒子内部的坐标移动，而前面的案例设置了定位的父亲是body
        var x = e.pageX - father.offsetLeft;
        var y = e.pageY - father.offsetTop;
        //为了使鼠标在放大镜方块居中，将放大镜方块上移一半高度，以及左移一半宽度，
        //所以下面要减small.offsetWidth / 2和small.offsetHeight / 2
        var smallX = x - small.offsetWidth / 2;
        var smallY = y - small.offsetHeight / 2;
        //另外，放大镜方块只能在father盒子里移动，不能超出去，所以当left<=0时，将left固定为0
        //这样左边就固定了，那么右边，不要让right=0，而是要计算出放大镜离father的最大左间距
        //上下同理
        var maxLeft = father.offsetWidth - small.offsetWidth;
        var maxTop = father.offsetHeight - small.offsetHeight;
        if(smallX <= 0){
            smallX = 0;
        }else if(smallX >= maxLeft){
            smallX = maxLeft;
        }
        if(smallY <= 0){
            smallY = 0;
        }else if(smallY >= maxTop){
            smallY = maxTop;
        }
        small.style.left = smallX + 'px';
        small.style.top = smallY + 'px';

        //最后，让大手机图片随着放大镜移动，但是因为大手机宽度和高度更大，
        //所以移动的距离并不等于放大镜移动的距离,所以我们可以用等比例来计算
        //放大镜移动的距离/放大镜移动的最大距离=大手机移动的距离/大手机移动的最大距离
        //所以大手机移动的距离=放大镜移动的距离*大手机移动的最大距离/放大镜移动的最大距离
        var maxBigX = scale.offsetWidth - big.offsetWidth;
        var maxBigY = scale.offsetHeight - big.offsetHeight;
        big.style.left = smallX * maxBigX / maxLeft + 'px';//图片大，盒子小，所以这个正好是负值，
        //达到了放大镜往左，大手机往右的效果
        big.style.top = smallY * maxBigY / maxTop + 'px';
    })
})