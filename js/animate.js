function animate(obj, target, callback) {//添加一个回调函数的形参，当计时器结束时再来返回调用这个函数
    //利用公式获得一个变化步长:（目标位置 - 当前位置) / 10
    //但是为了保证步长不出现小数，所以需要取整
    //当步长为正值，表示前进，此时取整应该向上取整，因为假设走了8.1，那么如果取整8则往后退了
    //当步长为负值，表示后退，此时取整应该向下取整，因为假设步长为-8.1，要走8.1的距离，
    //如果向上取整为-8，则没有走出应走的距离
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
        }
        if(callback){
            callback();//调用函数
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);

}