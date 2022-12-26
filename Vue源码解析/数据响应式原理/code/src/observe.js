import Observer from "./Observer.js";
// 创建observe函数
export default function observe(value) {
    // 如果value不是对象，什么都不做
    if(typeof value != 'object') return
    // 定义ob
    let ob;
    // __ob__就应该是一个Observer的实例对象
    if(typeof value.__ob__ !== 'undefined') {
        // 如果value身上有这个__ob__，也就是已经有Observer的实例对象了
        // 将这个Observer的实例对象赋值给ob，最后进行返回
        ob = value.__ob__
    }else {
        // 如果value身上没有这个__ob__
        // 那么就创建Observer对象，Observer类的构造函数会在value的身上加个__ob__属性
        // 值就是这个new的Observer实例对象
        ob = new Observer(value)
    }

    return ob
}